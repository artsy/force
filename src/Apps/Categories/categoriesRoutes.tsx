import loadable from "@loadable/component"
import { serverCacheTTLs } from "Apps/serverCacheTTLs"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"

const CategoriesApp = loadable(
  () => import(/* webpackChunkName: "categoriesBundle" */ "./CategoriesApp"),
  {
    resolveComponent: component => component.CategoriesAppFragmentContainer,
  }
)

export const categoriesRoutes: RouteProps[] = [
  {
    path: "/categories",
    serverCacheTTL: serverCacheTTLs.categories,
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
