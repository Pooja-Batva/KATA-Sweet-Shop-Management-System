// This code snippet is part of the sweet.controller.js file, which handles the creation of new sweets in the shop.
// It uses the addSweet function from sweetService.js to add a new sweet to the database

const { addSweet, deleteSweet, getAllSweets  } = require('../services/sweetService.js');

async function createSweet(req, res) {
    try {
        const sweetData = req.body;
        const newSweet = await addSweet(sweetData);
        res.status(201).json(newSweet);
    } catch (error) {
        res.status(500).json({ message: 'Error adding sweet', error: error.message });
    }
}

async function removeSweet(req, res) {
  try {
    const sweet = await deleteSweet(req.params.id);
    if (!sweet) return res.status(404).json({ error: 'Sweet not found' });
    res.json({ message: 'Sweet deleted', sweet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function listSweets(req, res) {
  try {
    const sweets = await getAllSweets();
    res.json(sweets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createSweet,
  removeSweet,
  listSweets,
};
// This code snippet is part of the sweet.controller.js file, which handles the creation of new sweets in the shop.
// It uses the addSweet function from sweetService.js to add a new sweet to the database    