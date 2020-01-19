const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  description: String,
  images: [],
  main_image: {
    type: String,
    default: "https://gear.nitro.com/content/images/thumbs/default-image_600.png"
  },
  category: String,
  last_auction_price: { 
    type: Number, 
    default: "0" 
  },
  startValue: {
    type: Number,
    required: true
  },
  value: Number ,
  initial_date: { 
    type: Date,
    default: Date.now
  },
  end_date: { type: Date },
  participants: [
    {
      user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
      },
      price: Number ,
      date: Date
    }
  ]

})

var Product = mongoose.model('Product', productSchema);

module.exports = Product;