/* Add Sweets:
    Users should be able to add new sweets to the shop.
    Each sweet should have a unique identifier (e.g., ID), name, category (e.g.. chocolate, candy, pastry), price, and quantity in stock.
*/
const Sweets = require('../../src/models/sweetSchema.model.js');
const { addSweet, deleteSweet, getAllSweets } = require('../../src/services/sweetService.js');
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


describe('deleteSweet()', () => {
  it('should delete a sweet by ID', async () => {
    const mockId = '123abc';
    const mockDeleted = { _id: mockId, name: 'Ladoo' };

    Sweet.findByIdAndDelete.mockResolvedValue(mockDeleted);

    const result = await deleteSweet(mockId);

    expect(Sweet.findByIdAndDelete).toHaveBeenCalledWith(mockId);
    expect(result.name).toBe('Ladoo');
  });

  it('should return null if sweet not found', async () => {
    Sweet.findByIdAndDelete.mockResolvedValue(null);

    const result = await deleteSweet('nonexistent');
    expect(result).toBeNull();
  });
});


describe('getAllSweets()', () => {
  it('should return all sweets from the DB', async () => {
    const mockSweets = [
      { _id: '1', name: 'Ladoo', category: 'candy', price: 30, quantity: 50 },
      { _id: '2', name: 'Barfi', category: 'pastry', price: 40, quantity: 100 }
    ];

    Sweet.find.mockResolvedValue(mockSweets);

    const result = await getAllSweets();

    expect(result.length).toBe(2);
    expect(Sweet.find).toHaveBeenCalled();
  });
});