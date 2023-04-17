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
    prepareVariables: (params, props) => {
      const includeArtworksByFollowedArtists = true
      const isAuction = true
      const liveSale = true

      return {
        ...params,
        ...props,
        includeArtworksByFollowedArtists,
        isAuction,
        liveSale,
      }
    },
    query: graphql`
      query endingSoonAuctionsRoutes_TopLevelQuery(
        $includeArtworksByFollowedArtists: Boolean!
        $isAuction: Boolean!
        $liveSale: Boolean!
      ) {
        viewer {
          ...EndingSoonAuctions_viewer
            @arguments(
              includeArtworksByFollowedArtists: $includeArtworksByFollowedArtists
              isAuction: $isAuction
              liveSale: $liveSale
            )
        }
      }
    `,
  },
]
