const express = require("express");
const path = require("path");
const router = express.Router();
const mealModel = require("../models/mealkit");
const userModel = require("../models/user");



router.get("/list-mealkit",(req,res) => {
    if(!req.session.isClerk){
        res.redirect("/");
    }

    else{
    mealModel.find()
    .exec()
    .then(data => {
        // Pull the data (exclusively)
        // This is to ensure that our "data" object contains the returned data (only) and nothing else.
        let meals = data.map(value => value.toObject());

        res.render("clerk/clerk_add_edit", {
            meals
        });
    })
    }

});

router.get("/remove-mealkit",(req,res) => {
    if(!req.session.isClerk){
        res.redirect("/");
    }

    else{
    mealModel.find()
    .exec()
    .then(data => {
        // Pull the data (exclusively)
        // This is to ensure that our "data" object contains the returned data (only) and nothing else.
        let meals = data.map(value => value.toObject());

        res.render("clerk/clerk_remove", {
            meals
        });
    })
    }

});

router.get("/edit-mealkit",(req,res) => {
    if(!req.session.isClerk){
        res.redirect("/");
    }

    else{
    mealModel.find()
    .exec()
    .then(data => {
        // Pull the data (exclusively)
        // This is to ensure that our "data" object contains the returned data (only) and nothing else.
        let meals = data.map(value => value.toObject());

        res.render("clerk/clerk_edit", {
            meals
        });
    })
    }

});

router.get("/clerk_add",(req,res) =>{
    if(!req.session.isClerk){
        res.redirect("/");
    }

    else{
    res.render("clerk/clerk_add");
    }
});

router.post("/removeMeal",(req,res) =>{ 
    mealModel.deleteOne({
        title: req.body.title
    })
    .exec()
    .then(()=>{
        console.log("Successfully deleted");

                // Redirect to home page
                res.redirect("/clerk/list-mealkit");
    })
});

router.post("/addMeal",(req,res) =>{
    let errors = [];

    const meal = new mealModel({
        title: req.body.title,
        includes: req.body.includes,
        description: req.body.description,
        categoryName: req.body.categoryName,
        price: req.body.price,
        cookingTime: req.body.cookingTime,
        serving: req.body.serving,
        imageUrl: null,
        top_meal: req.body.top_meal
    });

    meal.save()
    .then(mealSave =>{

       console.log(`Meal ${mealSave.title} has been added.`);
        
        // create a unique name for image
        let uniquename= `meal-name-${mealSave._id}${path.parse(req.files.imageUrl.name).ext}`;
        req.files.imageUrl.mv(`assets/images/${uniquename}`)
        .then(()=>{
            mealModel.updateOne({
                _id: mealSave._id
            },{
                "imageUrl": `/images/${uniquename}`
            })
            .then(()=>{
                console.log("successfully saved image")
                res.redirect("/")
            })
            .catch(err => {
                console.log(`Error saving the meal image ${err}`);
            res.redirect("/");
            })
        })
        .catch(err =>{
            console.log(`Error uploading the meal image ${err}`);
            res.redirect("/");
        })
        
    })
    .catch(err =>{
        errors.push("Meal Could not be added.")
        console.log(`Error adding meal: ${err}`);
        res.render("clerk/clerk_add",{
            errors
        });
    });
});

router.post("/updateMeal", (req, res) => {


        // Update the document in the collection
        mealModel.updateOne({
            title: req.body.title
        }, {
            $set: {
                includes: req.body.includes,
                description: req.body.description,
                categoryName: req.body.categoryName,
                price: req.body.price,
                cookingTime: req.body.cookingTime,
                serving: req.body.serving,
                top_meal: req.body.top_meal

            }
        })
            .exec()
            .then(() => {
                console.log("Successfully updated the document for: " + req.body.title);

                // Redirect to home page
                res.redirect("/clerk/list-mealkit");
            });
    }

);



module.exports = router;