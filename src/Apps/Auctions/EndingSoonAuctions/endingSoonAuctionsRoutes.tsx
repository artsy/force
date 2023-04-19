import { AppRouteConfig } from "System/Router/Route"
import { graphql } from "react-relay"
import loadable from "@loadable/component"

const EndingSoonAuctions = loadable(() => import("./EndingSoonAuctions"), {
  resolveComponent: component => component.EndingSoonAuctionsFragmentContainer,
})

export const endingSoonAuctionsRoutes: AppRouteConfig[] = [
  {
    path: "/auctions/ending-soon",
    getComponent: () => EndingSoonAuctions,
    onClientSideRender: () => {
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
