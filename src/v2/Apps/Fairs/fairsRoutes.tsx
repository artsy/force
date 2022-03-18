import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

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

export const fairsRoutes: AppRouteConfig[] = [
  {
    path: "/art-fairs",
    getComponent: () => FairsApp,
    onClientSideRender: () => {
      return FairsApp.preload()
    },
    children: [
      {
        path: "",
        getComponent: () => FairsIndexRoute,
        onClientSideRender: () => {
          return FairsIndexRoute.preload()
        },
        query: graphql`
          query fairsRoutes_FairsQuery {
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
