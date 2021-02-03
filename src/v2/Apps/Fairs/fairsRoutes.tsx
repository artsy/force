import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RedirectException, RouteConfig } from "found"

const FairsApp = loadable(() => import("./FairsApp"), {
  resolveComponent: component => component.FairsApp,
})

const FairsIndexRoute = loadable(() => import("./Routes/FairsIndex"), {
  resolveComponent: component => component.FairsIndexFragmentContainer,
})

export const fairsRoutes: RouteConfig[] = [
  {
    path: "/fairs",
    render: _props => {
      throw new RedirectException("/art-fairs", 302)
    },
  },
  {
    path: "/art-fairs",
    getComponent: () => FairsApp,
    prepare: () => {
      return FairsApp.preload()
    },
    children: [
      {
        path: "",
        getComponent: () => FairsIndexRoute,
        prepare: () => {
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
