import { useState } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import AppRoutes from "./utilities/app-routes";
import { AddRecipe, Home } from "./loadables";
import { BrowserRouter } from "react-router-dom";
import Navigation from "@components/Navigation";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route
            path={AppRoutes.BASE}
            element={<Navigate to={AppRoutes.HOME} />}
          />
          <Route path={AppRoutes.HOME} element={<Home />} />
          <Route path={AppRoutes.ADD_RECIPE} element={<AddRecipe />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
