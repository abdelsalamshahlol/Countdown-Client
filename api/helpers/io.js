const io = require('socket.io');
const productModel = require('../db/models/productModel');

function init(serverIO) {
  serverIO.on('connection', function (socket) {
    // console.log(`a user connected to socket`, socket.id);
    // io.getIO().sockets.to(bubble_id).emit('message', message);

    socket.on('join', (productId) => {
      console.log({productId});
      socket.join(productId);

      socket.on('bid', bid => {
        console.log({bid});
        // Update the product value
        let currentValue;
        productModel.findById(productId)
          .then(product => {
            let startingValue = product.value > 0 ? product.value : product.startValue;
            currentValue = bid.value + startingValue;
            console.log({product});
            return productModel.findByIdAndUpdate(productId, {value: currentValue});
          })
          .then(result => {
            // Return the product value
            // socket.to(bid.productId).emit('bid:broadcast', {
            //   msg: 'Someone made a bid',
            //   currentValue
            // });
            serverIO.in(bid.productId).emit('bid:broadcast', {
              msg: 'Someone made a bid',
              currentValue: result.value
            });
          })
          .catch(err => {
            console.log({err})
          });
      });
    });
  });
}

module.exports = {
  io,
  init
};
