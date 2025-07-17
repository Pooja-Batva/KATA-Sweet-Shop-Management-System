const mongoose = require('mongoose');
const app = require('./src/app.js');

mongoose.connect('mongodb://localhost:27017/sweetshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
