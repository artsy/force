import loadable from "@loadable/component"
import { graphql } from "react-relay"

const ArtworkApp = loadable(() => import("./ArtworkApp"))

export const routes = [
  {
    path: "/artwork/:artworkID/:optional?", // There's a `confirm-bid` nested route.
    getComponent: () => ArtworkApp,
    prepare: () => {
      ArtworkApp.preload()
    },
    query: graphql`
      query routes_ArtworkQuery(
        $artworkID: String!
        $includeUnlisted: Boolean
      ) {
        artwork(id: $artworkID, includeUnlisted: $includeUnlisted)
          @principalField {
          ...ArtworkApp_artwork
        }
        me {
          ...ArtworkApp_me
        }
      }
    `,
    prepareVariables: ({ artworkID }, _props) => {
      return {
        artworkID,
        includeUnlisted: true,
      }
    },
    cacheConfig: {
      force: true,
    },
  },
]
