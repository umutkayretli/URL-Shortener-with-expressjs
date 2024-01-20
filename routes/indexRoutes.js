const express = require('express');
const ShortUrl = require('../model/urlModel');
const app = express.Router();
const shortId = require('shortid');

app.get('/', async (req, res) => {
  try {
    const urls = await ShortUrl.find();
    res.render('index', { urls });
  }
  catch (error) {
    console.error(error);
    res.render('error', { errorMessage: 'Veriler alınamadı' });
  }
});


app.post('/', async (req, res) => {
  let fullUrl = req.body.url;

  console.log('Received URL:', fullUrl);

  if (!fullUrl || fullUrl.trim() === '') {
    return res.status(400).send('URL boş olamaz');
  }

  // If input URL doesn't start with http:// 
  if (!/^http?:\/\//i.test(fullUrl)) {
    fullUrl = 'http://' + fullUrl;
  }

  const shortUrl = shortId.generate();

  try {
    const urls = await ShortUrl.find();
    const createdUrl = await ShortUrl.create({ full: fullUrl, short: shortUrl }); //full and short are collections of mongoDB
    res.render('index', { urls, shortUrl: `${createdUrl.short}` });
  } catch (error) {
    console.error(error);
    res.render('error', { errorMessage: 'URL kaydedilemedi' });
  }
});


app.get('/:shortUrl', async (req, res) => {
  const shortUrl = req.params.shortUrl;

  const result = await ShortUrl.findOne({ short: shortUrl });

  if (result) {
    res.redirect(result.full); //it gets result with findOne function and redirect the original URL
  } else {
    res.render('error');
  }
});

module.exports = app; 