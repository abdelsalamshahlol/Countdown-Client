const io = require('socket.io');
const productModel = require('../db/models/productModel');

function init(serverIO) {
  serverIO.on('connection', function (socket) {
    // console.log(`a user connected to socket`, socket.id);
    socket.on('join', (productId) => {
      // console.log(`joining bid ${productId}`);
      socket.join(productId);
    });
// Finish leaving the bid
    socket.on('leave', (productId) => {
      // console.log(`leaving bid ${productId}`);
      socket.join(productId);
    });

    socket.on('bid', bid => {
      // Update the product value
      let currentValue = 0;
      productModel.findById(bid.productId)
        .then(result => {
          let startingValue = result.value > 0 ? result.value : result.startValue;
          currentValue = bid.value + startingValue;
          result.value = currentValue;
          result.save(() => {
            serverIO.in(bid.productId).emit('bid:broadcast', {
              msg: 'Someone made a bid',
              currentValue: result.value
            });
          });
        })
        .catch(err => {
          console.log({err})
        });
    });
  });
}

module.exports = {
  io,
  init
};
