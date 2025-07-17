const express = require('express');
const router = express.Router();
const { createSweet, removeSweet, handlePurchase, listSweets, handleRestock  } = require('../controllers/sweet.controller.js');
// Route to create a new sweet
router.post('/', createSweet);

// Route to delete a sweet
router.delete('/:id', removeSweet);

router.get('/', listSweets);


router.patch('/:id/purchase', handlePurchase); 

router.patch('/:id/restock', handleRestock);

// Export the router
module.exports = router;