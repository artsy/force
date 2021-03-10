import loadable from "@loadable/component"
import { graphql } from "react-relay"

const AuctionsApp = loadable(() => import("./AuctionsApp"), {
  resolveComponent: component => component.AuctionsAppFragmentContainer,
})

const CurrentAuctions = loadable(() => import("./Routes/CurrentAuctions"), {
  resolveComponent: component => component.CurrentAuctionsFragmentContainer,
})

const UpcomingAuctions = loadable(() => import("./Routes/UpcomingAuctions"), {
  resolveComponent: component => component.UpcomingAuctionsFragmentContainer,
})

const PastAuctions = loadable(() => import("./Routes/PastAuctions"), {
  resolveComponent: component => component.PastAuctionsFragmentContainer,
})

export const auctionsRoutes = [
  {
    path: "/auctions2",
    getComponent: () => AuctionsApp,
    prepare: () => {
      AuctionsApp.preload()
    },

    query: graphql`
      query auctionsRoutes_AuctionsQuery {
        me {
          ...AuctionsApp_me
        }
      }
    `,
    children: [
      {
        path: "", // represents current auctions aka /auctions/current
        getComponent: () => CurrentAuctions,
        prepare: () => {
          CurrentAuctions.preload()
        },
        query: graphql`
          query auctionsRoutes_Current_AuctionsQuery {
            salesConnection(first: 99, published: true, sort: START_AT_ASC) {
              ...CurrentAuctions_salesConnection
            }
          }
        `,
      },
      {
        path: "upcoming",
        getComponent: () => UpcomingAuctions,
        prepare: () => {
          UpcomingAuctions.preload()
        },
        query: graphql`
          query auctionsRoutes_Upcoming_AuctionsQuery {
            upcomingAuctions: salesConnection(
              first: 99
              published: true
              sort: START_AT_ASC
            ) {
              ...UpcomingAuctions_upcomingAuctions
            }
          }
        `,
      },
      {
        path: "past",
        getComponent: () => PastAuctions,
        prepare: () => {
          PastAuctions.preload()
        },
        query: graphql`
          query auctionsRoutes_Past_AuctionsQuery {
            salesConnection(
              first: 30
              published: false
              live: false
              sort: START_AT_ASC
            ) {
              ...PastAuctions_salesConnection
            }
          }
        `,
      },
    ],
  },
]
