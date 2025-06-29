import * as React from "react";
import loadable, { LoadableComponent } from "@loadable/component";

export const Home: LoadableComponent<any> = loadable(
  () => import("@components/Home"),
  {
    fallback: <div>Loading...</div>,
  }
);

export const Recipes: LoadableComponent<any> = loadable(
  () => import("@components/Recipes"),
  {
    fallback: <div>Loading...</div>,
  }
);

export const AddRecipe: LoadableComponent<any> = loadable(
  () => import("@components/AddRecipe"),
  {
    fallback: <div>Loading...</div>,
  }
);
