const express = require('express');
const router = express.Router();
const db = require('../models');
const {
    createFoodItem, getAllFoodItems, getGroceryList, getOneFoodItem, updateFoodItem, deleteFoodItem
} = require('../utils/foodCRUD');

router.route("/")
    .get(getAllFoodItems)
    .post(createFoodItem);

router.route("/groceryList")
    .get(getGroceryList)

router.route("/:id")
    .get(getOneFoodItem)
    .put(updateFoodItem)
    .delete(deleteFoodItem);

module.exports = router;
