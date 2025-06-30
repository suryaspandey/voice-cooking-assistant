import { Card, CardContent } from "@components/ui/card";
import { Clock, Users } from "lucide-react";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";

export const RecipeCard = ({ recipe }: any) => {
  return (
    <>
      <Card className="rounded-2xl shadow-md overflow-hidden">
        <div className="h-40 bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
          {recipe.imageUrl ? (
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>

        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{recipe.title}</h3>
            <Badge variant="outline">{recipe.category}</Badge>
          </div>

          <p className="text-muted-foreground text-sm">{recipe.description}</p>

          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{recipe.cookingTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{recipe.servings} servings</span>
            </div>
            <Badge>{recipe.difficulty}</Badge>
          </div>

          <div className="flex gap-2 flex-wrap mt-2">
            {recipe.ingredients.slice(0, 3).map((item: any, idx: any) => (
              <Badge variant="secondary" key={idx}>
                {item}
              </Badge>
            ))}
            {recipe.ingredients.length > 3 && (
              <Badge variant="outline">
                +{recipe.ingredients.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RecipeCard;
