import React from "react"
import { AppRouteConfig } from "v2/System/Router/Route"
import { CategoriesApp } from "./CategoriesApp"

export const categoriesRoutes: AppRouteConfig[] = [
  {
    path: "/categories-2",
    theme: "v3",
    Component: _props => {
      return <CategoriesApp />
    },
  },
]
