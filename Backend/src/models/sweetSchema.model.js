const mongoose = require('mongoose');
const { Schema } = mongoose;

const sweetSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            index : true,
            trim : true,
        },
        category: {
            type: String,
            required: true,
            enum: ['chocolate', 'candy', 'pastry', 'other'],
            index : true,
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'Price must be a positive number'],
        },
        quantityInStock: {
            type: Number,
            required: true,
            min: [0, 'Quantity in stock must be a non-negative number'],
        },
    }, 
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Sweet', sweetSchema);
