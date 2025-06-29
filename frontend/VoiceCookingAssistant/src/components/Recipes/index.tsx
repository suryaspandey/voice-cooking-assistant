import RecipeCard from "@components/RecipeCard";
import { Card } from "@components/ui/card";
import { useRecipeStore } from "@store/recipeStore";
import { useEffect } from "react";

const Recipes = () => {
  const { recipesList, recipeListLoading, fetchRecipes, recipeListError }: any =
    useRecipeStore();

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (recipeListLoading) return <p>Loading recipes...</p>;
  if (recipeListError) return <p>{recipeListError.message}</p>;

  console.log(recipesList);

  return (
    <>
      <h2>Recipes List</h2>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-2">
          {recipesList?.map((recipe: any) => (
            <RecipeCard recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Recipes;
