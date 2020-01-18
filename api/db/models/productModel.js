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
  value: {
    type: Number,
    default: 0
  },
  initial_date: {
    type: Date,
    default: Date.now
  },
  end_date: {type: Date},
  participants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      price: Number,
      date: Date
    }
  ]
});

productSchema.pre('save', (next) => {
  this.value = this.get('startValue');
  next();
});

const Product = mongoose.model('Product', productSchema);
// For testing only << To BE DELETED in PRODUCTION >>
// let product = new Product({
//   name: 'Audi RS7',
//   owner: '5e22018a681644029d1e266b',
//   description: '2014 RS7 with 5000km',
//   images: ['https://scdn.slashgear.com/wp-content/uploads/2019/09/audi-rs7-578-1280x720.jpg'],
//   main_image: 'https://scdn.slashgear.com/wp-content/uploads/2019/09/audi-rs7-578-1280x720.jpg',
//   category: 'Vehicles',
//   last_auction_price: 0,
//   value: 150000,
//   initial_date: 'Sat Jan 18 2020 11:51:42 GMT+0200 (Eastern European Standard Time)',
//   end_date: 'Tue Jan 21 2020 11:51:42 GMT+0200 (Eastern European Standard Time)',
//   participants: []
// });
// product.save()
module.exports = Product;
