const express = require('express');
const router = express.Router();
const { createSweet, removeSweet } = require('../controllers/sweet.controller.js');
// Route to create a new sweet
router.post('/', createSweet);

// Route to delete a sweet
router.delete('/:id', removeSweet);

router.get('/', listSweets);

// Export the router
module.exports = router;