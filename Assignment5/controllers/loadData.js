const mealModel = require("../models/mealkit")

const  express = require("express");

const router = express.Router();

  var meals = [
    {
      title: "Butter Chicken",
      includes: "Chicken,Butter,Tomatos,",
      description: "Nothing Beat classic Indian Butter chicken.",
      categoryName: "Classic Meal",
      price: 8.99,
      cookingTime: 15,
      serving: 2,
      imageUrl: "/images/butter_chicken.jpg",
      top_meal: true,
    },
    {
      title: "Tacos",
      includes: "Taco shell,Vegetables",
      description: "Mexican for anytime of the day when you are feeling snacky.",
      categoryName: "Classic Meal",
      price: 5.99,
      cookingTime: 10,
      serving: 4,
      imageUrl: "/images/tacos.jpg",
      top_meal: true,
    },
    {
      title: "Spaghetti",
      includes: "Spaghetti,Tomato Pasta sauce,vegetables",
      description: "Nothing like Authentic Italian Spaghetti",
      categoryName: "Classic Meal",
      price: 3.99,
      cookingTime: 15,
      serving: 2,
      imageUrl: "/images/spaghetti.jpg",
      top_meal: false,
    },
    {
      title: "Crispy Buffalo Cauliflower Bites",
      includes: "Rice Flour,Cauliflower,sauces",
      description: "Crispy Buffalo Cauliflower Bites that can bring spice to your mouth.",
      categoryName: "Vegan Meal",
      price: 4.99,
      cookingTime: 15,
      serving: 3,
      imageUrl: "/images/Crispycauliflower.jpg",
      top_meal: true,
    },
    {
      title: "Chicken Caesar Salad",
      includes: "Chicken Breast,Caesar Sauce,Vegetables",
      description: "One of the best healthy options.",
      categoryName: "Classic Meal",
      price: 8.99,
      cookingTime: 8,
      serving: 2,
      imageUrl: "/images/chickenSalad.jpg",
      top_meal: false,
    },
    {
      title: "Pizza",
      includes: "Pizza dough,pizza Sauce,Vegetables",
      description: "One of the best healthy options.",
      categoryName: "vegan Meal",
      price: 8.99,
      cookingTime: 25,
      serving: 2,
      imageUrl: "/images/pizza.jpg",
      top_meal: false,
    },

  ];
  

router.get("/load-data/meal-kits", (req,res) =>{
    

    for(let i = 0 ; i < meals.length; i++){

        let meal = new mealModel({
            title : meals[i].title,
            includes :meals[i].includes,
            description: meals[i].description,
            categoryName: meals[i].categoryName,
            price: meals[i].price,
            cookingTime: meals[i].cookingTime,
            serving: meals[i].serving,
            imageUrl: meals[i].imageUrl,
            top_meal: meals[i].top_meal
        })

        meal.save()
        .then(mealSaved =>{
            console.log(`${mealSaved.title} added into database`)
        })

        .catch(err =>{
            console.log(`Error adding meal: ${err}`);
        });
    }

    res.redirect("/clerk/list-mealkit");
});

module.exports = router;