import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { graphql } from "react-relay"

const EndingSoonAuctions = loadable(() => import("./EndingSoonAuctions"), {
  resolveComponent: component => component.EndingSoonAuctionsFragmentContainer,
})

export const endingSoonAuctionsRoutes: RouteProps[] = [
  {
    path: "/auctions/lots-for-you-ending-soon",
    getComponent: () => EndingSoonAuctions,
    onPreloadJS: () => {
      EndingSoonAuctions.preload()
    },
    query: graphql`
      query endingSoonAuctionsRoutes_TopLevelQuery {
        viewer {
          ...EndingSoonAuctions_viewer
        }
      }
    `,
  },
]
