const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  author:{
    type: String,
    required: false
  },
  status:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('Item', itemSchema);