const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ShortUrl = require('./model/urlModel');

dotenv.config();
const app = express();

const indexRoutes = require('./routes/indexRoutes');

mongoose.connect(process.env.MONGO_URI)

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error!');
});


app.use(indexRoutes);

app.listen(3000, () => {
  console.log('Listening on the port 3000');
});