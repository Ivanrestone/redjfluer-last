const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Bouquets', 'BoxWithFlowers', 'VaseWithPlant']
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  captions: [{
    type: String
  }],
  limited: {
    type: Boolean,
    default: false
  },
  unitsSold: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
