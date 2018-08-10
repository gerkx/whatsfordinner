const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Your food needs a name!"]
    },
    dept: {
        type: String,
        required: true
    },
    amt: {
        type: Number,
        default: 0,
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
   addedDates: [Date],
   purchasedDates: [Date],
});

const foodModel = mongoose.model("FoodSchema", foodSchema);

module.exports = foodModel;