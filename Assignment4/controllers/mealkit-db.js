const express = require("express");
const router = express.Router();
const mealList = require("../models/mealkit-list");


router.get("/OnMyMenu",(req,res) => {
    res.render("general/OnMyMenu",{
        meals : mealList.getAllmeal()
    });
});


module.exports = router;