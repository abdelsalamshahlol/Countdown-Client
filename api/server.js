const express = require('express'),

nodemailer = require('nodemailer');
sendMail = require('./mailer')
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
config = require('./db/db');
require('dotenv').config();
http = require('http');
const socketIO = require('./helpers/io');

const multer = require('multer')





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

app.use(express.static(path.join(__dirname, 'uploads')));

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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

app.post("/api/upload", upload.array("uploads[]", 12), function (req, res) {
  res.send(req.files);
});

app.get('/api/uploads/:filename', (req, res) => {
  res.sendFile(path.resolve("uploads/", req.params.filename))
})