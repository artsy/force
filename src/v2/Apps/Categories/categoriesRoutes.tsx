import React from "react"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"
import { CategoriesApp } from "./CategoriesApp"

export const categoriesRoutes: AppRouteConfig[] = [
  {
    path: "/categories-2",
    theme: "v3",
    Component: props => {
      return <CategoriesApp {...props} />
    },
    query: graphql`
      query categoriesRoutes_Query {
        geneFamiliesConnection(first: 20) {
          edges {
            node {
              id
              slug
              name
              genes {
                id
                slug
                name
                displayName
                isPublished
              }
              featuredGeneLinks {
                href
                title
                image {
                  url(version: "large_rectangle")
                }
              }
            }
          }
        }
      }
    `,
  },
]
