import loadable from "@loadable/component"
import { HttpError } from "found"
import { graphql } from "react-relay"
import { updateContext } from "Server/middleware/bootstrapSharifyAndContextLocalsMiddleware"
import { AppRouteConfig } from "System/Router/Route"
import { getFeatureFlag } from "System/useFeatureFlag"

const ArtworkApp = loadable(
  () => import(/* webpackChunkName: "artworkBundle" */ "./ArtworkApp"),
  {
    resolveComponent: component => component.ArtworkResultFragmentContainer,
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
    render: ({ Component, props }) => {
      if (!(Component && props)) {
        return undefined
      }

      const requestError = (props as any).artworkResult?.requestError
      const requestErrorStatusCode = requestError?.statusCode

      const enableCustomErrorPage = getFeatureFlag(
        "onyx_custom_artwork_error_page"
      )

      if (requestErrorStatusCode) {
        if (enableCustomErrorPage) {
          updateContext("statusCode", requestErrorStatusCode)
        } else {
          throw new HttpError(requestErrorStatusCode)
        }
      }

      return <Component {...props} />
    },
    query: graphql`
      query artworkRoutes_ArtworkQuery($artworkID: String!) {
        artworkResult(id: $artworkID) {
          ...ArtworkApp_artworkResult

          ... on ArtworkError {
            requestError {
              statusCode
            }
          }
        }
        me {
          ...ArtworkApp_me @arguments(artworkID: $artworkID)
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
