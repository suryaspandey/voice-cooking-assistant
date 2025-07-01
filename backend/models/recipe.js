const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim:true,
    minLength: [3, 'Title must be at least 3 characters']
  },
  category: {
    type: String,
    required: true,
    trim:true,
    minLength: [5, 'Category must be at least 5 characters']
  },
  ingredients: {
    type: [String],
    required: true,
    validate: [arr => arr.length > 0, 'At least one ingredient is required']
  },
  instructions: {
    type: [String],
    required: true,
    validate:[arr=>arr.length > 0,'At least one instruction is required']
  },
  difficulty:{
    type:String,
    required:true,
    enum: {
        values: ['EASY', 'MEDIUM', 'DIFFICULT'],
        message: '{VALUE} is not supported. Choose EASY, MEDIUM, or DIFFICULT.'
      }
  },
  servings:{
    type:Number,
    required:true,
    min:[1,'Must serve at least one person']
  },
  cookingTime:{
    type:Number,
    required:true,
    min:[1,'Cooking time must be at least 1 minute']
  },
  prepTime:{
    type:Number,
    required:true,
    min:[1,'Preparation time must be at least 1 minute']
  },
   imageUrl: {
    type: String,
    required: false,
    trim: true
  },

}, { timestamps: true, strict:"throw" });

module.exports = mongoose.model('Recipe', recipeSchema);
