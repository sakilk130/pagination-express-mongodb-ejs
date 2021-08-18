const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mainRoutes = require('./routes/route');

const app = express();

mongoose.connect('mongodb://localhost:27017/test-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.set('view engine', 'ejs');
app.use(mainRoutes);

app.listen(4000, function () {
  console.log(`server is running on port 4000`);
});
