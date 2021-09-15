import React from "react"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"
import { CategoriesAppFragmentContainer } from "./CategoriesApp"

export const categoriesRoutes: AppRouteConfig[] = [
  {
    path: "/categories",
    theme: "v3",
    Component: props => {
      return <CategoriesAppFragmentContainer {...props} />
    },
    query: graphql`
      query categoriesRoutes_Query {
        geneFamiliesConnection(first: 20) {
          ...CategoriesApp_geneFamiliesConnection
        }
      }
    `,
  },
]
