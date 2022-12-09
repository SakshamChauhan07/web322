const express = require("express");
const router = express.Router();
const mongoose =  require("mongoose");
const mealModel = require("../models/mealkit");

router.get("/", (req, res) => {
    mealModel.find()
    .exec()
    .then(data => {
        // Pull the data (exclusively)
        // This is to ensure that our "data" object contains the returned data (only) and nothing else.
        let meals = data.map(value => value.toObject());

        res.render("general/home", {
            meals
        });
    })
});


router.get("/aboutme", (req,res) =>{
    res.render("general/aboutme");
});


module.exports = router;