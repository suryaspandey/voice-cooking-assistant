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

  searchRecipesByTitleAndCategory: async ({ title, category }: any) => {
    set({
      recipeListError: null,
      recipeListLoading: true,
    });
    try {
      const params = new URLSearchParams();
      if (title) params.append("title", title);
      if (category) params.append("category", category);

      const res = await axios.get(
        `http://localhost:5000/api/recipes/search?${params.toString()}`
      );
      set({
        recipesList: res.data,
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
