const Sweet = require('../models/sweetSchema.model.js');

async function addSweet(sweetData) {
  const sweet = await Sweet.create(sweetData);
  return sweet;
}


async function deleteSweet(id) {
  const deletedSweet = await Sweet.findByIdAndDelete(id);
  return deletedSweet;
}

async function getAllSweets() {
  return await Sweet.find();
}

async function searchAndSortSweets(query) {
  const { name, category, minPrice, maxPrice, sortBy, order } = query;

  const filter = {};

  if (name) {
    filter.name = { $regex: name, $options: 'i' }; // case-insensitive search
  }
  if (category) {
    filter.category = category.toLowerCase();
  }
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  const sortOrder = order === 'desc' ? -1 : 1;
  const sortObj = {};
  if (sortBy) sortObj[sortBy] = sortOrder;

  const sweets = await Sweet.find(filter).sort(sortObj);
  return sweets;
}

async function purchaseSweet(id, quantity) {
  const sweet = await Sweet.findById(id);
  if (!sweet) throw new Error('Sweet not found');

  if (sweet.quantity < quantity) {
    throw new Error('Not enough stock available');
  }

  sweet.quantity -= quantity;
  await sweet.save();

  return sweet;
}


module.exports = {
  addSweet,
  deleteSweet,
  getAllSweets,
  purchaseSweet,
  searchAndSortSweets,
};

// This code snippet is part of the sweetService.js file, which handles the business logic for sweets in the shop.
// It includes functions to add, delete, and retrieve sweets, as well as search and sort