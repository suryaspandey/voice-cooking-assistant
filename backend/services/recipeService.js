const Recipe = require('../models/recipe')

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
const deletedRecipe = async(id)=>{
    return await Recipe.findByIdAndDelete(id);
}

const searchRecipe = async(query)=>{
  const regex = new RegExp(`^${query}`, 'i');
  return await Recipe.find({ title: { $regex: regex } }).limit(10);
}
// const searchRecipe = async (query) => {
//     return await Recipe.find({
//         title: { $regex: query, $options: 'i' }
//     });
// };

module.exports={
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deletedRecipe,
    searchRecipe
}