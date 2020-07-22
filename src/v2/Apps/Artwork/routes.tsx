import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { userHasLabFeature } from "v2/Utils/user"

const ArtworkApp = loadable(() => import("./ArtworkApp"))

export const routes = [
  {
    path: "/artwork/:artworkID/:optional?", // There's a `confirm-bid` nested route.
    getComponent: () => ArtworkApp,
    prepare: () => {
      ArtworkApp.preload()
    },
    prepareVariables: ({ artworkID }, props) => {
      const user = props.context.user

      const shouldFetchArtistSeriesData = userHasLabFeature(
        user,
        "Artist Series"
      )
      return {
        artworkID,
        shouldFetchArtistSeriesData,
      }
    },
    query: graphql`
      query routes_ArtworkQuery(
        $artworkID: String!
        $shouldFetchArtistSeriesData: Boolean!
      ) {
        artwork(id: $artworkID) @principalField {
          ...ArtworkApp_artwork
            @arguments(
              shouldFetchArtistSeriesData: $shouldFetchArtistSeriesData
            )
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
