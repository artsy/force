import loadable from "@loadable/component"
import { graphql } from "react-relay"

const ConsignApp = loadable(() => import("./ConsignApp"))

export const consignRoutes = [
  {
    path: "/consign2",
    getComponent: () => ConsignApp,
    prepare: () => {
      ConsignApp.preload()
    },
    query: graphql`
      query consignRoutes_ArtworkQuery {
        artist(id: "andy-warhol") @principalField {
          ...ConsignApp_artist
        }
      }
    `,
  },
]
