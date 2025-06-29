const Recipe = require('../models/recipe')
const s3 = require("../config/awsConfig");
const { v4: uuidv4 } = require("uuid");

const getAllRecipes = async () => {
    return await Recipe.find();
};

const getRecipeById = async(id)=>{
    return await Recipe.findById(id)
}

const createRecipe  = async(data)=>{
    const newRecipe = new Recipe(data);
    return await newRecipe.save();
}

const updateRecipe = async (id, data) => {
    return await Recipe.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};
const deleteRecipe = async(id)=>{
    return await Recipe.findByIdAndDelete(id);
}

const searchRecipe = async(query)=>{
  const regex = new RegExp(`^${query}`, 'i');
  return await Recipe.find({ title: { $regex: regex } }).limit(10);
}

const uploadToS3 = async (file) => {
  const params = {
    Bucket: "recipe-app-uploader",
    Key: `recipes/${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const data = await s3.upload(params).promise();
  return data.Location; // image url of S3
};

const uploadRecipe = async (formData, file) => {
  let imageUrl = null;

  if (!file) {
    console.warn("No image file received");
  } else {
    try {
        imageUrl = await uploadToS3(file);
        
    } catch (error) {
        console.error("S3 Upload Error:", error);
        throw new Error("Image upload to S3 failed");
    }
  }
  let ingredients = [];
  let instructions = [];

  try {
    ingredients = JSON.parse(formData.ingredients);
    instructions = JSON.parse(formData.instructions);
  } catch (error) {
    throw new Error("Invalid ingredients or instructions format");
  }

  const recipe = new Recipe({
    ...formData,
    ingredients,
    instructions,
    imageUrl,
  });

  return await recipe.save();
};




module.exports={
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchRecipe,
    uploadToS3,
    uploadRecipe
}