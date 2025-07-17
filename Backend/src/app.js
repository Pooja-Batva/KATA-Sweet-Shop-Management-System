const express = require('express');
const sweetRoute = require('./src/routes/sweet.route.js');
const app = express();
app.use(express.json());
app.use('/api/sweets', sweetRoute); // Set up the route for sweets      

module.exports = app;   