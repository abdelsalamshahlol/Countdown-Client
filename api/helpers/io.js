const io = require('socket.io');

function init(serverIO) {
  serverIO.on('connection', function (socket) {
    console.log(`a user connected to socket`, socket.id);
    socket.on('bid', bid => {
      console.log(bid);
      socket.broadcast.emit('bid:broadcast', {
        msg: 'Someone made a bid',
        currentValue: bid
      })
    });
  });
}

module.exports = {
  io,
  init
};
