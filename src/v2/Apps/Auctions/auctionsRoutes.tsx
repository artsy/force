import loadable from "@loadable/component"
import { graphql } from "react-relay"

const AuctionsApp = loadable(() => import("./AuctionsApp"), {
  resolveComponent: component => component.AuctionsAppFragmentContainer,
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
        currentSales: salesConnection(
          first: 99
          published: true
          sort: START_AT_ASC
        ) {
          ...AuctionsApp_currentSales
        }
        pastSales: salesConnection(
          first: 20
          published: true
          live: false
          sort: START_AT_ASC
        ) {
          ...AuctionsApp_pastSales
        }
      }
    `,
  },
]
