const app = require('../../src/app.js');
const Sweet = require('../../src/models/sweetSchema.model.js');

jest.mock('../../src/models/sweetSchema.model.js');

test('POST /sweets - should create sweet', async () => {
  const sweet = {
    name: 'Barfi',
    category: 'candy',
    price: 30,
    quantity: 200
  };

  Sweet.create.mockResolvedValue({ _id: 'abc123', ...sweet });

  const res = await request(app).post('/sweets').send(sweet);

  expect(res.statusCode).toBe(201);
  expect(res.body.name).toBe('Barfi');
});


test('DELETE /sweets/:id - deletes sweet', async () => {
  const mockSweet = { _id: '123abc', name: 'Rasgulla' };
  Sweet.findByIdAndDelete.mockResolvedValue(mockSweet);

  const res = await request(app).delete('/sweets/123abc');

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('Sweet deleted');
  expect(res.body.sweet.name).toBe('Rasgulla');
});