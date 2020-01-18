const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./db/db');
http = require('http');
require('dotenv').config();
var io = require('socket.io');

mongoose.Promise = global.Promise;

const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');

mongoose.connect(config.DB, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(
    () => {
      console.log('Database is connected')
    },
    err => {
      console.log('Can not connect to the database' + err)
    }
  );

mongoose.set("useCreateIndex", true);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/user', userRoute);
app.use('/api/products', productRoute);

const httpServer = http.createServer(app);
const port = process.env.PORT || 8085;
io = io(httpServer);

httpServer.listen(port, function () {
  console.log(`listening on http://localhost:${port}`);
});

io.on('connection', function (socket) {
  console.log(`a user connected to socket`, socket.id);
  socket.on('bid', bid => {
    console.log(bid)
  });
});
