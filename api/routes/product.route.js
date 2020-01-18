const express = require('express');
const app = express();
const productRoutes = express.Router();

let Product = require('../db/models/productModel')

productRoutes.route('/add').post( (req, res) => {
  let product = new Product(req.body);
  product.save()
  .then(product => {
    res.status(200).json({msg: 'products added successfully'});
  })
  .catch(err => {
    res.status(400).json({msg: "unable to save to database"});
  });
});

productRoutes.route('/getAll').get( (req, res) => {
  Product.find({end_date: { $gte: new Date() }}, (err, products) => {
    (err) ? console.log(err) : res.json(products)
  });
});

productRoutes.route('/:id').get( (req, res) => {
  let id = req.params.id;
  Product.findById(id, (err, product) => {
    res.json(product);
  });
});

productRoutes.route('/delete/:id').get( (req, res) => {
  Product.findByIdAndRemove({_id: req.params.id}, function(err, product){
      (err) ? res.json(err) : res.json({"msg": 'Successfully removed'});
  });
});

productRoutes.route('/update/:id').put( (req, res) => {
  Product.findByIdAndUpdate(
    {_id: req.params.id},
    {
      last_auction_price: req.body.last_auction_price,
      $push: {
        participants: {
            $each: [
              {
                user: req.body.userId,
                price: req.body.last_auction_price,
                date: Date.now()
              }
            ],
            $position: 0
        }
      }
    },
    {useFindAndModify: false, new: true}
  )

  .populate("participants.user")
  .exec((err, product) => {
    if (err) {
      res.status(400).json({msg: "cant update the database"});
    } else {
      res.status(200).json({product, msg: 'productUpdated complete'});
    }
  });

});

productRoutes.route('/getwinner/:id').get( (req, res) => {
  Product.find({ _id: req.params.id })
  .populate("participants.user")
  .exec((err, product) => {
    if (err) {
      return handleError(err);
    } else {
      res.status(200).json(product[0].participants[0].user);
    }
  });
});


productRoutes.route('/getByCategory/:category').get( (req, res) => {
  var category = req.params.category.toLowerCase();
  Product.find({end_date: { $gte: new Date() }, category}, (err, products) => {
    (err) ? console.log(err) : res.json(products)
  });
});

productRoutes.route('/getByUser/:userId').get( (req, res) => {
  var userId = req.params.userId
  Product.find({end_date: { $gte: new Date() }, owner: userId}, (err, products) => {
    (err) ? console.log(err) : res.json(products)
  });
});

module.exports = productRoutes;
