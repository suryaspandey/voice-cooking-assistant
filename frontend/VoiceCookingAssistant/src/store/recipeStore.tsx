import { create } from "zustand";
import axios from "axios";

export const useRecipeStore = create((set) => ({
  recipesList: [],
  recipeListLoading: false,
  recipeListError: null,

  fetchRecipes: async () => {
    set({
      recipeListError: null,
      recipeListLoading: true,
    });

    try {
      const data = await axios.get("http://localhost:5000/api/recipes");
      set({
        recipesList: data.data,
        recipeListLoading: false,
      });
    } catch (error) {
      set({
        recipeListError: error,
        recipeListLoading: false,
      });
    }
  },
}));
