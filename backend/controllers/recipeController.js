const recipeService = require('../services/recipeService');
const { uploadToS3 } = require("../services/recipeService");

const getRecipes= async(req,res)=>{
    try {
        const recipes= await recipeService.getAllRecipes();
        res.json(recipes);
    } catch (error) {
        res.status(500).send("Error fetching recipes");
    }
}

const getRecipe= async(req,res)=>{
    try {
        const recipeById = await recipeService.getRecipeById(req.params.id);
        if(!recipeById){
            return res.status(400).send("Recipe not found");
        }
        res.json(recipeById)
    } catch (error) {
        res.status(500).send("Error fetching recipe");
    }
}

const createRecipe= async(req,res)=>{
    try {
        const newRecipe = await recipeService.createRecipe(req.body);
        res.status(201).json(newRecipe);
      } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
      }
}

const updateRecipe = async (req, res) => {
    try {
        let updatedData = {...req.body}
        if(req.file){
            const imageUrl = await uploadToS3(req.file);
            updatedData.imageUrl = imageUrl;
        }
        const updatedRecipe = await recipeService.updateRecipe(req.params.id, updatedData);
        if (!updatedRecipe) {
            return res.status(404).send('Recipe not found');
        }
        res.json(updatedRecipe);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const message = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ errors: message });
        }
        if (error.name === 'StrictModeError') {
            return res.status(400).json({ error: `Invalid field: ${error.path}` });
        }
        res.status(500).send('Error updating recipe');
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await recipeService.deleteRecipe(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).send('Recipe not found');
        }
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
};

const searchRecipe = async(req,res)=>{
    const {query} =  req.query;
    if(!query){
        return res.status(400).send("Search query is required");
    }

    try {
        
        const results = await recipeService.searchRecipe(query);
        
        res.json(results)
        
    } catch (error) {
        res.status(500).json({ error: 'Error searching recipes', details: error.message });
    }
}

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = await uploadToS3(req.file);
    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload image", error });
  }
};

const uploadRecipe = async (req, res) => {

  try {
    const recipe = await recipeService.uploadRecipe(req.body, req.file);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Failed to upload recipe" });
  }
};

module.exports = {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipe,
    uploadImage,
    uploadRecipe
};