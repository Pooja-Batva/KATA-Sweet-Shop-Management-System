// This code snippet is part of the sweet.controller.js file, which handles the creation of new sweets in the shop.
// It uses the addSweet function from sweetService.js to add a new sweet to the database

const { addSweet, deleteSweet, getAllSweets, searchAndSortSweets, purchaseSweet   } = require('../services/sweetService.js');

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

async function listSweets(req, res) {
  try {
    const hasQuery = Object.keys(req.query).length > 0;

    const sweets = hasQuery
      ? await searchAndSortSweets(req.query)
      : await getAllSweets();

    res.json(sweets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function handlePurchase(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updatedSweet = await purchaseSweet(id, Number(quantity));

    res.json({
      message: 'Purchase successful',
      sweet: updatedSweet
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  createSweet,
  removeSweet,
  listSweets,
  listSweets,
  handlePurchase,
};
// This code snippet is part of the sweet.controller.js file, which handles the creation of new sweets in the shop.
// It uses the addSweet function from sweetService.js to add a new sweet to the database    