const mongoose = require('mongoose');

mongoose.set('debug', true);

const dbURL = process.env.DATABASEURL || 'mongodb://localhost:27017/wfd_v01';
mongoose.connect(dbURL, { useNewUrlParser: true })

mongoose.Promise = Promise;

module.exports.FoodModel = require('./foodModel');
