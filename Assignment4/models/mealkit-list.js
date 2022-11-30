var meals = [
  {
    title: "Butter Chicken",
    includes: "Chicken,Butter,Tomatos,",
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
    categoryName: "Vegan Meal",
    price: 4.99,
    cookingTime: 15,
    serving: 3,
    imageUrl: "/images/Crispycauliflower.jpg",
    top_meal: true,
  },
];

module.exports.getAllmeal = function() {
    return meals;
};


module.exports.getTopMeal = function () {
  let meals = [];

  for (let i = 0; i < meals.length; i++) {
    if(meals[i].top_meal){
        meals.push(meals[i]);
    }
  }

  return meals;
};


