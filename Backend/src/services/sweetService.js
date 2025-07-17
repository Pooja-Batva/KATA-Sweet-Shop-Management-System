const Sweet = require('../models/sweetSchema.model.js');

async function addSweet(sweetData) {
  const sweet = await Sweet.create(sweetData);
  return sweet;
}

module.exports = {
  addSweet
};


async function deleteSweet(id) {
  const deletedSweet = await Sweet.findByIdAndDelete(id);
  return deletedSweet;
}

module.exports = {
  addSweet,
  deleteSweet
};
