const csv = require('csvtojson');
const foodFile = './foodItemSeed.csv';
const mongoose = require('mongoose');
const db = require('../models');

// module.exports = 

const seedDB = (model, file) => {
    db[model].remove({}, err => {
        if(err) console.log(err);
        else 
            console.log(`${model} wiped`);
            csv().fromFile(file)
                .then(jsonObj=>jsonObj.shuffle())
                .then(arr => arr.forEach(
                    item => {
                        item.addedDates = Date.now();
                        db[model].create(item), (err, food) =>{
                            if(err) console.log(err);
                            else console.log(`${food} saved!`);
                        }
                    }
                ));
    });
}

seedDB("FoodModel", foodFile);

Array.prototype.shuffle = function(){
    this.forEach( function(val, idx, arr){
        const seed = Math.floor(Math.random() * (idx+1));
        [arr[idx], arr[seed]] = [arr[seed], arr[idx]];
    });
    return this;
}
