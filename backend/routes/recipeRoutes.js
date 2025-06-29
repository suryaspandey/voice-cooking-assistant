const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const upload = require("../middleware/upload");
const { uploadRecipe } = require("../controllers/recipeController");

router.get('/recipes', recipeController.getRecipes);

router.get('/recipes/search',recipeController.searchRecipe);

router.post('/recipes', recipeController.createRecipe);

router.get('/recipes/:id', recipeController.getRecipe);

router.put(
  "/recipes/:id",
  upload.single("image"),
  recipeController.updateRecipe
);

router.delete('/recipes/:id', recipeController.deleteRecipe);

router.post("/recipes/upload", upload.single("image"), recipeController.uploadRecipe);

module.exports = router;