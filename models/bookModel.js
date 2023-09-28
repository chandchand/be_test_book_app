
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  
  code: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },
  
  created_at: {
    type: Date,
    default: Date.now()
},
});

module.exports = mongoose.model('Book', bookSchema);
