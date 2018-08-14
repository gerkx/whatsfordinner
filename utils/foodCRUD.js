const db = require('../models')
const MongoQS = require('mongo-querystring');


exports.createFoodItem = (req, res) => {
    console.log(req.body)
    db.FoodModel.create(req.body)
        .then(newItem => res.json(newItem))
        .catch(err => res.send(err))
}

exports.getAllFoodItems = (req, res) => {
    const qs = new MongoQS
    const parms = qs.parse(req.query);
    db.FoodModel.find(parms)
        .then(foundItems => res.status(201).json(foundItems))
        .catch(err => res.send(err))
}

exports.getGroceryList = (req, res) => {
    db.FoodModel.find( { "amt": { $gt: 0 } } )
        .then(foundItems => res.status(201).json(foundItems))
        .catch(err => res.send(err))
}

exports.getOneFoodItem = (req, res) => {
    db.FoodModel.findById(req.params.id)
        .then(foundItem => res.json(foundItem))
        .catch(err => res.send(err))
}

exports.updateFoodItem = (req, res) => {
    db.FoodModel.findByIdAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true}
    )
        .then(updatedItem => res.json(updatedItem))
        .catch(err => res.send(err))
}

exports.deleteFoodItem = (req, res) => {
    db.FoodModel.findByIdAndRemove(req.params.id)
        .then(() => res.json({mssg: "Item successfully removed"}))
        .catch(err => res.send(err))
}

