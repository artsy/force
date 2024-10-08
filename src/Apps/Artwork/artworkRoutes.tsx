import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { updateContext } from "Server/middleware/bootstrapSharifyAndContextLocalsMiddleware"
import { RouteProps } from "System/Router/Route"

const ArtworkApp = loadable(
  () => import(/* webpackChunkName: "artworkBundle" */ "./ArtworkApp"),
  {
    resolveComponent: component => component.ArtworkResultFragmentContainer,
  }
)

export const artworkRoutes: RouteProps[] = [
  {
    path: "/artwork/:artworkID/:optional?", // There's a `confirm-bid` nested route.
    fetchPolicy: "store-and-network",
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

      if (requestErrorStatusCode) {
        updateContext("statusCode", requestErrorStatusCode)
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
  },
]
