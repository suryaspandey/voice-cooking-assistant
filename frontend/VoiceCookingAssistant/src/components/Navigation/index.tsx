import { Link, useLocation } from "react-router-dom";
import { PiChefHat } from "react-icons/pi";
import { FiBook } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { GrHomeRounded } from "react-icons/gr";
import AppRoutes from "@utilities/app-routes";

const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const getNavItemClass = (path: string) =>
    isActive(path)
      ? "bg-orange-500 text-white p-2 rounded flex items-center space-x-2"
      : "text-black p-2 rounded flex items-center space-x-2 hover:bg-orange-100";

  return (
    <nav className="bg-white border-b border-orange-200 shadow-sm">
      <div className="container flex justify-between mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={AppRoutes.BASE} className="flex items-center space-x-2">
            <PiChefHat className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-800 ">VoiceCook</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to={AppRoutes.HOME} className={getNavItemClass(AppRoutes.HOME)}>
            <GrHomeRounded className="h-4 w-4" />
            <span className="text-base">Home</span>
          </Link>

          <Link
            to={AppRoutes.RECIPES}
            className={getNavItemClass(AppRoutes.RECIPES)}
          >
            <FiBook className="h-4 w-4" />
            <span className="text-base">Recipes</span>
          </Link>

          <Link
            to={AppRoutes.ADD_RECIPE}
            className={getNavItemClass(AppRoutes.ADD_RECIPE)}
          >
            <GoPlus className="h-4 w-4" />
            <span className="text-base">Add Recipe</span>
          </Link>

          <Link
            to={AppRoutes.VOICE_ASSISTANT}
            className={getNavItemClass(AppRoutes.VOICE_ASSISTANT)}
          >
            <MdOutlineKeyboardVoice className="h-4 w-4" />
            <span className="text-base">Voice Assistant</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
