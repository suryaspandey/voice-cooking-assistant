import { Input } from "@components/ui/input";
import { useRecipeStore } from "@store/recipeStore";
import { useEffect, useState } from "react";

export const RecipeSearchBox = ({ onSelect }: any) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim()) {
        onSelect(query);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <Input
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 h-12 text-lg border-orange-200"
      />

      {loading && <p className="text-sm mt-1 text-gray-500">Searching...</p>}
    </>
  );
};

export default RecipeSearchBox;
