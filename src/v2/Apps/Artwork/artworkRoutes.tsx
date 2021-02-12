import loadable from "@loadable/component"
import { graphql } from "react-relay"

const ArtworkApp = loadable(() => import("./ArtworkApp"), {
  resolveComponent: component => component.ArtworkAppFragmentContainer,
})

export const artworkRoutes = [
  {
    path: "/artwork/:artworkID/:optional?", // There's a `confirm-bid` nested route.
    getComponent: () => ArtworkApp,
    prepare: () => {
      ArtworkApp.preload()
    },
    prepareVariables: ({ artworkID }, props) => {
      return {
        artworkID,
      }
    },
    query: graphql`
      query artworkRoutes_ArtworkQuery($artworkID: String!) {
        artwork(id: $artworkID) @principalField {
          ...ArtworkApp_artwork
        }
        me {
          ...ArtworkApp_me
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
