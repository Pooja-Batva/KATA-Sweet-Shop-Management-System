/* Add Sweets:
    Users should be able to add new sweets to the shop.
    Each sweet should have a unique identifier (e.g., ID), name, category (e.g.. chocolate, candy, pastry), price, and quantity in stock.
*/
const Sweets = require('../../src/models/sweetSchema.model.js');
const { addSweet, deleteSweet, getAllSweets, searchAndSortSweets, restockSweet  } = require('../../src/services/sweetService.js');
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

describe('searchAndSortSweets()', () => {
  it('should search by name and sort by price descending', async () => {
    const mockQuery = {
      name: 'barfi',
      sortBy: 'price',
      order: 'desc'
    };

    const mockSweets = [
      { _id: '1', name: 'Barfi', price: 50 },
      { _id: '2', name: 'Barfi Deluxe', price: 100 }
    ];

    Sweet.find.mockImplementation((filter) => {
      return {
        sort: jest.fn().mockResolvedValue(mockSweets)
      };
    });

    const result = await searchAndSortSweets(mockQuery);

    expect(Sweet.find).toHaveBeenCalledWith({ name: { $regex: 'barfi', $options: 'i' } });
    expect(result[0].price).toBe(50); // mock returned list
  });
});

describe('purchaseSweet()', () => {
  it('should decrease stock if enough quantity available', async () => {
    const mockSweet = {
      _id: 'abc123',
      name: 'Gulab Jamun',
      quantity: 10,
      save: jest.fn().mockResolvedValue({ _id: 'abc123', name: 'Gulab Jamun', quantity: 5 })
    };

    Sweet.findById.mockResolvedValue(mockSweet);

    const result = await purchaseSweet('abc123', 5);

    expect(Sweet.findById).toHaveBeenCalledWith('abc123');
    expect(mockSweet.save).toHaveBeenCalled();
    expect(result.quantity).toBe(5);
  });

  it('should throw error if not enough stock', async () => {
    const mockSweet = { _id: 'abc123', name: 'Gulab Jamun', quantity: 3 };

    Sweet.findById.mockResolvedValue(mockSweet);

    await expect(purchaseSweet('abc123', 5)).rejects.toThrow('Not enough stock available');
  });

  it('should throw error if sweet not found', async () => {
    Sweet.findById.mockResolvedValue(null);

    await expect(purchaseSweet('invalidId', 2)).rejects.toThrow('Sweet not found');
  });
});


describe('restockSweet()', () => {
  it('should increase sweet quantity by given amount', async () => {
    const mockSweet = {
      _id: '123',
      name: 'Kaju Katli',
      quantity: 10,
      save: jest.fn().mockResolvedValue({ _id: '123', name: 'Kaju Katli', quantity: 30 })
    };

    Sweet.findById.mockResolvedValue(mockSweet);

    const result = await restockSweet('123', 20);

    expect(Sweet.findById).toHaveBeenCalledWith('123');
    expect(mockSweet.save).toHaveBeenCalled();
    expect(result.quantity).toBe(30);
  });

  it('should throw error if sweet not found', async () => {
    Sweet.findById.mockResolvedValue(null);

    await expect(restockSweet('999', 10)).rejects.toThrow('Sweet not found');
  });
});
