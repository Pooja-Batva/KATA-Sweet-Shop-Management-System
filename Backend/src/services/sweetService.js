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


module.exports = {
  addSweet,
  deleteSweet,
  getAllSweets,
};
