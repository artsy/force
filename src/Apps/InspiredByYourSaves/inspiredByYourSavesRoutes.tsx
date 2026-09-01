import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const InspiredByYourSavesApp = loadable(
  () =>
    import(
      /* webpackChunkName: "inspiredByYourSavesBundle" */ "./InspiredByYourSavesApp"
    ),
  {
    resolveComponent: component => component.InspiredByYourSavesApp,
  },
)

export const inspiredByYourSavesRoutes: RouteProps[] = [
  {
    path: "/inspired-by-your-saves",
    getComponent: () => InspiredByYourSavesApp,
    onPreloadJS: () => {
      InspiredByYourSavesApp.preload()
    },
    query: graphql`
      query inspiredByYourSavesRoutes_TopLevelQuery(
        $first: Int = 10
        $after: String
      ) {
        me {
          ...InspiredByYourSavesApp_me @arguments(first: $first, after: $after)
        }
      }
    `,
  },
]
