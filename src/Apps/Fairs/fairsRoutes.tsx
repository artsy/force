import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { graphql } from "react-relay"

const FairsApp = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./FairsApp"),
  {
    resolveComponent: component => component.FairsApp,
  }
)

const FairsIndexRoute = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./Routes/FairsIndex"),
  {
    resolveComponent: component => component.FairsIndexFragmentContainer,
  }
)

export const fairsRoutes: RouteProps[] = [
  {
    path: "/art-fairs",
    getComponent: () => FairsApp,
    onPreloadJS: () => {
      FairsApp.preload()
    },
    children: [
      {
        path: "",
        getComponent: () => FairsIndexRoute,
        onPreloadJS: () => {
          FairsIndexRoute.preload()
        },
        query: graphql`
          query fairsRoutes_FairsQuery @cacheable {
            featuredFairs: orderedSets(key: "art-fairs:featured") {
              ...FairsIndex_featuredFairs
            }
            viewer {
              ...FairsIndex_viewer
            }
          }
        `,
      },
    ],
  },
]
