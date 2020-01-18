const io = require('socket.io');

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
        // Return the product value

        socket.to(bid.productId).emit('bid:broadcast', {
          msg: 'Someone made a bid',
          currentValue: bid
        })
        // serverIO.in(bid.productId).emit('bid:broadcast', {
        //   msg: 'Someone made a bid',
        //   currentValue: bid
        // })
      });
    });
  });
}

module.exports = {
  io,
  init
};
