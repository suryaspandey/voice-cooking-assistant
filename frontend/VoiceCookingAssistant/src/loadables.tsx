import * as React from "react";
import loadable, { LoadableComponent } from "@loadable/component";

export const Home: LoadableComponent<any> = loadable(
  () => import("@containers/Home"),
  {
    fallback: <div>Loading...</div>,
  }
);

export const AddRecipe: LoadableComponent<any> = loadable(
  () => import("@containers/Home/AddRecipe"),
  {
    fallback: <div>Loading...</div>,
  }
);
