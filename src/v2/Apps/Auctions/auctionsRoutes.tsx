import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { CurrentAuctionsPaginationContainer } from "./Routes/CurrentAuctions"
import { PastAuctionsPaginationContainer } from "./Routes/PastAuctions"
import { UpcomingAuctionsPaginationContainer } from "./Routes/UpcomingAuctions"

const AuctionsApp = loadable(() => import("./AuctionsApp"), {
  resolveComponent: component => component.AuctionsAppFragmentContainer,
})

export const auctionsRoutes = [
  {
    path: "/auctions",
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
    ],
  },
]
