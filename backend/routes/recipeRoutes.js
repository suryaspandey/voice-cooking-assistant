const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/recipes', recipeController.getRecipes);

router.get('/recipes/search',recipeController.searchRecipe);

router.post('/recipes', recipeController.createRecipe);

router.get('/recipes/:id', recipeController.getRecipe);

router.put('/recipes/:id', recipeController.updateRecipe);

router.delete('/recipes/:id', recipeController.deleteRecipe);

module.exports = router;