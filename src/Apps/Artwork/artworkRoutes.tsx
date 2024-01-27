import { Text } from "@artsy/palette"
import loadable from "@loadable/component"
import { HttpError } from "found"
import { graphql } from "react-relay"
import { updateContext } from "Server/middleware/bootstrapSharifyAndContextLocalsMiddleware"
import { AppRouteConfig } from "System/Router/Route"
import { getENV } from "Utils/getENV"

const ArtworkApp = loadable(
  () => import(/* webpackChunkName: "artworkBundle" */ "./ArtworkApp"),
  {
    resolveComponent: component => component.ArtworkAppFragmentContainer,
  }
)

export const artworkRoutes: AppRouteConfig[] = [
  {
    path: "/artwork/:artworkID/:optional?", // There's a `confirm-bid` nested route.
    getComponent: () => ArtworkApp,
    onClientSideRender: () => {
      ArtworkApp.preload()
    },
    prepareVariables: ({ artworkID }, props) => {
      return {
        artworkID,
      }
    },
    render: ({ Component, props, match }) => {
      if (!(Component && props)) {
        return undefined
      }

      const requestError = (props as any).artwork?.requestError
      const requestErrorStatusCode = requestError?.statusCode

      const featureFlags = getENV("FEATURE_FLAGS")
      const enableCustom404Page = featureFlags?.["onyx_custom_artwork_404"]

      if (requestErrorStatusCode) {
        if (enableCustom404Page) {
          // Custom error page
          updateContext("statusCode", requestErrorStatusCode)
          return <Text>Not Found</Text>
        }
        // Default
        throw new HttpError(requestErrorStatusCode)
      }

      return <Component {...props} />
    },
    query: graphql`
      query artworkRoutes_ArtworkQuery($artworkID: String!) {
        artwork: artworkResult(id: $artworkID) {
          ... on Artwork {
            ...ArtworkApp_artwork
          }

          ... on ArtworkError {
            requestError {
              statusCode
            }
          }
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
