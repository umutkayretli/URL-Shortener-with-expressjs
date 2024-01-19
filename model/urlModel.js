const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  full: { type: String, required: true },
  short: String
});

const ShortUrl = mongoose.model('ShortUrl', urlSchema);

module.exports = ShortUrl;