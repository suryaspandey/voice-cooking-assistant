import RecipeCard from "@components/RecipeCard";
import RecipeSearchBox from "@components/RecipeSearchBox";
import { Button } from "@components/ui/button";
import { useRecipeStore } from "@store/recipeStore";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const Recipes = () => {
  const {
    recipesList,
    recipeListLoading,
    fetchRecipes,
    searchRecipesByTitleAndCategory,
    recipeListError,
  }: any = useRecipeStore();

  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const isTitle = searchTitle.trim() !== "";
      const isCategory = selectedCategory !== "All";
      if (!isTitle && !isCategory) {
        fetchRecipes();
      } else {
        const filters = {};
        if (isTitle) filters.title = searchTitle;
        if (isCategory) filters.category = selectedCategory;
        searchRecipesByTitleAndCategory(filters);
      }
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTitle, selectedCategory]);

  if (recipeListLoading) return <p>Loading recipes...</p>;
  if (recipeListError) return <p>{recipeListError.message}</p>;

  console.log(recipesList);

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snacks",
  ];

  return (
    <div className="p-2">
      <div className="mb-8 ">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Recipe Collection
        </h1>
        <p className="text-xl text-gray-600">
          Discover and cook amazing recipes with voice guidance
        </p>
      </div>
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <RecipeSearchBox
            onSelect={(query: any) => {
              // setSelectedCategory(selectedCategory);
              setSearchTitle(query);
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory(category);
              }}
              className={
                selectedCategory === category
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "border-orange-200 hover:bg-orange-50"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
          {recipesList?.map((recipe: any) => (
            <RecipeCard recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
