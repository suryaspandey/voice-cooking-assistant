import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import AppRoutes from "@utilities/app-routes";
import { ChefHat, Clock, Mic, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { homeCards, recentRecipes } from "./constants";
import { cn } from "@src/lib/utils";
// import NoImg from "@assets/images/no-img.png";
// import NoImg from "../src/assets/images/no-img.png";

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Voice Cooking Assistant
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Cook hands-free with voice commands. Get step-by-step guidance, set
            timers, and manage your recipes without touching your phone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to={AppRoutes.VOICE_ASSISTANT}>
              <Button
                // size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
              >
                {/* <Mic className="mr-2 h-5 w-5" /> */}
                <Mic strokeWidth={2.25} />
                Start Voice Cooking
              </Button>
            </Link>
            <Link to={AppRoutes.RECIPES}>
              <Button variant="outline" size="lg" className="px-8 py-3">
                <Search className="mr-2 h-5 w-5" />
                Browse Recipes
              </Button>
            </Link>
          </div>
        </div>

        <Card className="mb-12 border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100 py-4 border-0 rounded-lg">
            <CardTitle className="flex items-center text-gray-800">
              <ChefHat className="mr-2 h-6 w-6" />
              Voice Commands
            </CardTitle>
            <CardDescription>
              Here are some commands you can use while cooking
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 justify-evenly">
              <span className="p-1 flex items-center justify-center rounded-full border  border-gray-300 w-100">
                "Start cooking [recipe name]"
              </span>
              <span className="p-1 flex items-center justify-center rounded-full border border-gray-300 w-100">
                "Next step"
              </span>
              <span className="p-1 flex items-center justify-center rounded-full border border-gray-300 w-100">
                "Repeat step"
              </span>
              <span className="p-1 flex items-center justify-center rounded-full border border-gray-300 w-100">
                "Set timer for 10 minutes"
              </span>
              <span className="p-1 flex items-center justify-center rounded-full border border-gray-300 w-100">
                "Add flour to shopping list"
              </span>
              <span className="p-1 flex items-center justify-center rounded-full border border-gray-300 w-100">
                "Show ingredients"
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {homeCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                key={index}
                className="flex flex-col items-center text-gray-800 border-orange-200 shadow-lg"
              >
                <CardTitle className="flex flex-col items-center">
                  <Icon
                    size={48}
                    strokeWidth={2.25}
                    className="text-orange-600 m-4"
                  />
                  <h1>{card.title}</h1>
                </CardTitle>
                <CardContent className="text-gray-600 pb-1 text-center">
                  <p>{card.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Recent Recipes
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentRecipes.map((recipe) => {
              return (
                <Link
                  key={recipe.id}
                  to={AppRoutes.RECIPE_DETAILS.replace(":id", recipe.id)}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer border-orange-200">
                    <CardContent>
                      <div>
                        <img
                          src={recipe.imageUrl}
                          alt={recipe.recipeName}
                          height="100%"
                        />
                      </div>
                      <div className="font-bold text-lg">
                        {recipe.recipeName}
                      </div>
                      <div className="flex gap-4">
                        <span className="h-4 w-4 mr-1">
                          <Clock />
                        </span>
                        <span className="text-gray-700">{`${recipe.duration} mins`}</span>
                        <span className="border border-gray-500 rounded-2xl px-1">
                          {recipe.difficulty}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
