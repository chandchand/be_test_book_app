
const mongoose = require('mongoose');

const meberSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  penalty: {
    type: Boolean,
    required: true,
    default: false 
  },
  created_at: {
    type: Date,
    default: Date.now()
},
});

module.exports = mongoose.model('Member', meberSchema);
