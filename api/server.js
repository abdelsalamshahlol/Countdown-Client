const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
config = require('./db/db');
require('dotenv').config()

mongoose.Promise = global.Promise;

const userRoute = require('./routes/user.route');

mongoose.connect(config.DB, { useNewUrlParser: true })
.then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/user', userRoute);

const port = process.env.PORT || 8085;

app.listen(port, function() {
  console.log(`listening on http://localhost:${port}`);
});