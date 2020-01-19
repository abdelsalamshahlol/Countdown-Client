const io = require('socket.io');
const productModel = require('../db/models/productModel');
const jwt = require('jsonwebtoken');

function init(serverIO) {
  serverIO.on('connection', function (socket) {
    socket.on('join', (productId) => {
      socket.join(productId);
    });
// Finish leaving the bid
    socket.on('leave', (productId) => {
      socket.join(productId);
    });

    socket.on('bid', bid => {
      // Update the product value
      // get user ID from token jwt token
      let userId;
      try {
        userId = jwt.decode(bid.userToken, process.env.TOKEN_SECRET)._id;
      } catch (err) {
        console.log('Invalid jwt');
        return;
      }
      productModel.findByIdAndUpdate(
        {_id: bid.productId},
        {
          last_auction_price: bid.last_auction_price,
          $push: {
            participants: {
              $each: [
                {
                  user: userId,
                  price: bid.last_auction_price,
                  date: Date.now()
                }
              ],
              $position: 0
            }
          }
        },
        {useFindAndModify: false, new: true}
      ).populate("participants.user")
        .exec((err, product) => {
          if (err) {
            serverIO.in(bid.productId).emit('bid:broadcast', {
              msg: 'Sorry we encountered an error handling your request',
            });
          } else {
            serverIO.in(bid.productId).emit('bid:broadcast', {
              msg: 'Someone made a bid',
              product
            });
          }
        });
    });
  });
}

module.exports = {
  io,
  init
};
