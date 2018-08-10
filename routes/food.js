const express = require('express');
const router = express.Router();
const db = require('../models');
const {
    createFoodItem, getAllFoodItems, getOneFoodItem, updateFoodItem, deleteFoodItem
} = require('../utils/foodCRUD');

router.route("/")
    .get(getAllFoodItems)
    .post(createFoodItem);

router.route("/:food_id")
    .get(getOneFoodItem)
    .put(updateFoodItem)
    .delete(deleteFoodItem);

module.exports = router;