const mongoose = require('mongoose');

mongoose.set('debug', true);

const dbURL = process.env.DATABASEURL || 'mongodb://gerkx:iloveamanda23@ds125352.mlab.com:25352/wfdbeta';
mongoose.connect(dbURL, { useNewUrlParser: true })

mongoose.Promise = Promise;

module.exports.FoodModel = require('./foodModel');
