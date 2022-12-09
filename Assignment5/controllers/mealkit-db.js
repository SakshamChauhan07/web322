const express = require("express");
const { countDocuments } = require("../models/mealkit");
const router = express.Router();
const mealModel = require("../models/mealkit")

router.use(express.urlencoded({extended: true}));

router.get("/OnMyMenu",(req,res) => {
    mealModel.find()
        .exec()
        .then(data => {
            // Pull the data (exclusively)
            // This is to ensure that our "data" object contains the returned data (only) and nothing else.
            let meals = data.map(value => value.toObject());

            res.render("general/OnMyMenu", {
                meals
            });
        })
});


router.post("/getDesc",(req,res) =>{
    
    let name = req.body.title;
    mealModel.find()
        .exec()
        .then(data => {
            // Pull the data (exclusively)
            // This is to ensure that our "data" object contains the returned data (only) and nothing else.
            let meals = data.map(value => value.toObject());
            var meal = meals
            for (let i = 0; i<meals.length;i++){
                if (meals[i].title == name){
                    meal = meals[i]
                }
            }
            res.render("general/mealDesc", {
                meal
            });
        })
});

module.exports = router;