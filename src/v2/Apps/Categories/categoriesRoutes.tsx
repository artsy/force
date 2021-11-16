import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

const CategoriesApp = loadable(
  () => import(/* webpackChunkName: "categoriesBundle" */ "./CategoriesApp"),
  {
    resolveComponent: component => component.CategoriesAppFragmentContainer,
  }
)

export const categoriesRoutes: AppRouteConfig[] = [
  {
    path: "/categories",
    getComponent: () => CategoriesApp,
    onClientSideRender: () => {
      CategoriesApp.preload()
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
