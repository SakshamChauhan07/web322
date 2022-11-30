const express = require("express");
const router = express.Router();
const mealList = require("../models/mealkit-list");

router.get("/", (req, res) => {
    res.render("general/home", {
        meals : mealList.getAllmeal()
        });
});


router.get("/aboutme", (req,res) =>{
    res.render("general/aboutme");
});


module.exports = router;