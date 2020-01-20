const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
config = require('./db/db');
require('dotenv').config();
const nodemailer = require("nodemailer");
const sendMail = require('./mailer')

const multer = require('multer')
const sharp = require('sharp')
const storage = require('./upload-config')
const upload = multer(storage)
const fs = require('fs')


mongoose.Promise = global.Promise;

const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');

mongoose.connect(config.DB, { useNewUrlParser: true , useUnifiedTopology: true})
.then(
  () => {console.log(`Database is connected on ${config.DB}`) },
  err => { console.log('Can not connect to the database'+ err)}
);

mongoose.set("useCreateIndex", true)

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/user', userRoute);
app.use('/api/products', productRoute);

const port = process.env.PORT || 8085;

app.listen(port, function() {
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

app.post('/upload',upload.single('image') ,async (req, res) => {
  const { filename: image } = req.file 
  
  await sharp(req.file.path)
  .resize(500)
  .jpeg({quality: 50})
  .toFile('newFile.jpg', function(err){
    if(err){
      res.send('error');
      return;
    }
    res.send({main_img: req.file.filename});
  });
})

app.get("/api/uploads/:name", (req, res) => {
  res.sendFile(path.resolve(__dirname, "uploads/", req.params.name));
});