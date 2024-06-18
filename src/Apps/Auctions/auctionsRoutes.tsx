import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"

const CurrentAuctionsPaginationContainer = loadable(
  () =>
    import(/* webpackChunkName: "auctionBundle" */ "./Routes/CurrentAuctions"),
  {
    resolveComponent: component => component.CurrentAuctionsPaginationContainer,
  }
)
const PastAuctionsPaginationContainer = loadable(
  () => import(/* webpackChunkName: "auctionBundle" */ "./Routes/PastAuctions"),
  {
    resolveComponent: component => component.PastAuctionsPaginationContainer,
  }
)

const UpcomingAuctionsPaginationContainer = loadable(
  () =>
    import(/* webpackChunkName: "auctionBundle" */ "./Routes/UpcomingAuctions"),
  {
    resolveComponent: component =>
      component.UpcomingAuctionsPaginationContainer,
  }
)
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

export const auctionsRoutes: RouteProps[] = [
  {
    path: "/auctions",
    ignoreScrollBehaviorBetweenChildren: true,
    getComponent: () => AuctionsApp,
    onClientSideRender: () => {
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
        Component: CurrentAuctionsPaginationContainer,
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
        Component: UpcomingAuctionsPaginationContainer,
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
        Component: PastAuctionsPaginationContainer,
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
        getComponent: () => AuctionsRoute,
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
        getComponent: () => ArtworksRoute,
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
