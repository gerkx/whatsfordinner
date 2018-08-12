///////////////////////////
// external dependencies //
///////////////////////////
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compression = require('compression');
const cors = require("cors");
///////////////////////////
// internal dependencies //
///////////////////////////
const foodRoutes = require('./routes/food');

/////////////////
// global vars //
/////////////////
const app = express();
const PORT = process.env.PORT || 3000;

////////////////
// middleware //
////////////////
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

////////////
// routes //
////////////
app.use("/api/food", foodRoutes);





///////////////
// listeners //
///////////////
app.listen(PORT,() => console.log(`wfd is running on port ${PORT}`));