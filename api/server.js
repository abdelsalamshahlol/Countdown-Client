const express = require('express'),


nodemailer = require('nodemailer');
sendMail = require('./mailer')
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
config = require('./db/db');
http = require('http');
require('dotenv').config();
const socketIO = require('./helpers/io');




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

// Socket IO Logic
let serverIO = socketIO.io(httpServer);
socketIO.init(serverIO);

httpServer.listen(port, function () {
  console.log(`listening on http://localhost:${port}`);
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let data = req.body
  sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent");
      res.send(info);
    }
  });
});