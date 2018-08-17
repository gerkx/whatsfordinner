const mongoose = require('mongoose');

mongoose.set('debug', true);

const dbURL = process.env.MONGODB_URI || 'mongodb://heroku_mq4jwvvw:ego42fchb9pcq8j4ol187qbeu3@ds125372.mlab.com:25372/heroku_mq4jwvvw';
mongoose.connect(dbURL, { useNewUrlParser: true })

mongoose.Promise = Promise;

module.exports.FoodModel = require('./foodModel');
