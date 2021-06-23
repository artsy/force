import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"
import { CurrentAuctionsPaginationContainer } from "./Routes/CurrentAuctions"
import { PastAuctionsPaginationContainer } from "./Routes/PastAuctions"
import { UpcomingAuctionsPaginationContainer } from "./Routes/UpcomingAuctions"

const AuctionsApp = loadable(
  () => import(/* webpackChunkName: "auctionBundle" */ "./AuctionsApp"),
  {
    resolveComponent: component => component.AuctionsAppFragmentContainer,
  }
)
const AuctionsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auctionBundle" */ "./Routes/Auctions/AuctionsRoute"
    ),
  {
    resolveComponent: component => component.AuctionsRouteFragmentContainer,
  }
)
const ArtworksRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "auctionBundle" */ "./Routes/Artworks/ArtworksRoute"
    ),
  {
    resolveComponent: component => component.ArtworksRouteFragmentContainer,
  }
)

export const auctionsRoutes: AppRouteConfig[] = [
  {
    path: "/auctions",
    theme: "v3",
    getComponent: () => AuctionsApp,
    prepare: () => {
      AuctionsApp.preload()
    },

    query: graphql`
      query auctionsRoutes_AuctionsQuery {
        viewer {
          ...AuctionsApp_viewer
        }
      }
    `,
    children: [
      {
        path: "", // represents current auctions aka /auctions/current
        theme: "v3",
        Component: CurrentAuctionsPaginationContainer,
        ignoreScrollBehavior: true,
        query: graphql`
          query auctionsRoutes_Current_AuctionsQuery {
            viewer {
              ...CurrentAuctions_viewer
            }
          }
        `,
      },
      {
        path: "upcoming",
        theme: "v3",
        Component: UpcomingAuctionsPaginationContainer,
        ignoreScrollBehavior: true,
        query: graphql`
          query auctionsRoutes_Upcoming_AuctionsQuery {
            viewer {
              ...UpcomingAuctions_viewer
            }
          }
        `,
      },
      {
        path: "past",
        theme: "v3",
        Component: PastAuctionsPaginationContainer,
        ignoreScrollBehavior: true,
        query: graphql`
          query auctionsRoutes_Past_AuctionsQuery {
            viewer {
              ...PastAuctions_viewer
            }
          }
        `,
      },
      {
        path: "auctions",
        theme: "v3",
        getComponent: () => AuctionsRoute,
        ignoreScrollBehavior: true,
        query: graphql`
          query auctionsRoutes_Auctions_AuctionsQuery {
            viewer {
              ...AuctionsRoute_viewer
            }
          }
        `,
      },
      {
        path: "artworks",
        theme: "v3",
        getComponent: () => ArtworksRoute,
        ignoreScrollBehavior: true,
        query: graphql`
          query auctionsRoutes_Artworks_AuctionsQuery {
            viewer {
              ...ArtworksRoute_viewer
            }
          }
        `,
      },
    ],
  },
]
