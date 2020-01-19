const io = require('socket.io');
const productModel = require('../db/models/productModel');

function init(serverIO) {
  serverIO.on('connection', function (socket) {
    // console.log(`a user connected to socket`, socket.id);
    // io.getIO().sockets.to(bubble_id).emit('message', message);

    socket.on('join', (productId) => {
      console.log(`joining bid ${productId}`);
      socket.join(productId);
    });
// Finish leaving the bid
    socket.on('leave', (productId) => {
      console.log(`leaving bid ${productId}`);
      socket.join(productId);
    });

    socket.on('bid', bid => {
      // console.log({bid});
      // Update the product value
      let currentValue = 0;
      productModel.findById(bid.productId)
        .then(result => {
            let startingValue = result.value > 0 ? result.value : result.startValue;
          currentValue = bid.value + startingValue;
          console.log({startingValue, currentValue});
          result.value = currentValue;
          result.save(() => {
            console.log({bid: bid.value, new: result.value});
            serverIO.in(bid.productId).emit('bid:broadcast', {
              msg: 'Someone made a bid',
              currentValue: result.value
            });
          });
        })
        // .then(product => {
        //   let startingValue = product.value > 0 ? product.value : product.startValue;
        //   currentValue = bid.value + startingValue;
        //   console.log({startingValue, currentValue});
        //   // console.log({product});
        //   productModel.findByIdAndUpdate(bid.productId, {value: currentValue}).then(result => {
        //     // Return the product value
        //     // socket.to(bid.productId).emit('bid:broadcast', {
        //     //   msg: 'Someone made a bid',
        //     //   currentValue
        //     // });
        //
        //     console.log({bid:bid.value, new: result.value});
        //     serverIO.in(bid.productId).emit('bid:broadcast', {
        //       msg: 'Someone made a bid',
        //       currentValue: result.value
        //     });
        //   })
        // })
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
