import loadable from "@loadable/component"
import { graphql } from "react-relay"

const AuctionsApp = loadable(() => import("./AuctionsApp"), {
  resolveComponent: component => component.AuctionsAppFragmentContainer,
})

const CurrentAuctions = loadable(() => import("./Routes/CurrentAuctions"), {
  resolveComponent: component => component.CurrentAuctionsPaginationContainer,
})

const UpcomingAuctions = loadable(() => import("./Routes/UpcomingAuctions"), {
  resolveComponent: component => component.UpcomingAuctionsPaginationContainer,
})

const PastAuctions = loadable(() => import("./Routes/PastAuctions"), {
  resolveComponent: component => component.PastAuctionsPaginationContainer,
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
        getComponent: () => CurrentAuctions,
        ignoreScrollBehavior: true,
        prepare: () => {
          CurrentAuctions.preload()
        },
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
        getComponent: () => UpcomingAuctions,
        ignoreScrollBehavior: true,
        prepare: () => {
          UpcomingAuctions.preload()
        },
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
        getComponent: () => PastAuctions,
        ignoreScrollBehavior: true,
        prepare: () => {
          PastAuctions.preload()
        },
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
