/* Add Sweets:
    Users should be able to add new sweets to the shop.
    Each sweet should have a unique identifier (e.g., ID), name, category (e.g.. chocolate, candy, pastry), price, and quantity in stock.
*/
const Sweets = require('../../src/models/sweetSchema.model.js');
const { addSweet } = require('../../src/services/sweetService.js');
jest.mock('../../src/models/sweetSchema.model.js');

test('addSweet should add a new sweet to the shop', async () => {
    const newSweet = {
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 1.99,
        quantity: 100
    };

    const savedSweet = {
        ...newSweet,
        _id: '12345' // Mocked ID
    };
    Sweets.create.mockResolvedValue(savedSweet);

    const result = await addSweet(newSweet);
    expect(result.name).toEqual('Chocolate Bar');
    expect(Sweets.create).toHaveBeenCalledWith(newSweet);
});

/*
Delete Sweets:
    Users should be able to remove sweets from the shop. 
*/

