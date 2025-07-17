const Sweet = require('../models/sweetSchema.model.js');

async function addSweet(sweetData) {
  const sweet = await Sweet.create(sweetData);
  return sweet;
}

module.exports = {
  addSweet
};
