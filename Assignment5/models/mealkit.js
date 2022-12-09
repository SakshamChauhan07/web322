const mongoose =  require("mongoose");



const mealSchema = new mongoose.Schema({
  title :{
    type: String,
    required: true,
    unique: true
    
  },
  includes:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  categoryName:{
    type: String,
    required: true
  },
  price:{
    type: mongoose.Types.Decimal128,
    required:true
  },
  cookingTime:{
    type: Number,
    required:true
  },
  serving:{
    type:Number,
      required: true
    },
  imageUrl:{
      type:String,
    },
  top_meal:{
      type:Boolean,
      default:false,
      required:true
    }
  });
  
  const mealModel = mongoose.model("meals",mealSchema);

  module.exports = mealModel;
