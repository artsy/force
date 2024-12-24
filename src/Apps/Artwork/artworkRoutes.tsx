import loadable from "@loadable/component"
import { updateContext } from "Server/middleware/bootstrapSharifyAndContextLocalsMiddleware"
import type { RouteProps } from "System/Router/Route"
import { getENV } from "Utils/getENV"
import { graphql } from "react-relay"

const ArtworkApp = loadable(
  () => import(/* webpackChunkName: "artworkBundle" */ "./ArtworkApp"),
  {
    resolveComponent: component => component.ArtworkResultFragmentContainer,
  },
)

export const artworkRoutes: RouteProps[] = [
  {
    path: "/artwork/:artworkID/:optional?", // There's a `confirm-bid` nested route.
    fetchPolicy: "store-and-network",
    getComponent: () => ArtworkApp,
    onPreloadJS: () => {
      ArtworkApp.preload()
    },
    prepareVariables: ({ artworkID }) => {
      // We want to defer loading the sidebar for mobile as it is below-the-fold.
      const loadSidebar = !getENV("IS_MOBILE")

      return {
        artworkID,
        loadSidebar,
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
      query artworkRoutes_ArtworkQuery(
        $artworkID: String!
        $loadSidebar: Boolean!
      ) {
        artworkResult(id: $artworkID) {
          ...ArtworkApp_artworkResult @arguments(loadSidebar: $loadSidebar)

          ... on ArtworkError {
            requestError {
              statusCode
            }
          }
        }
        me {
          ...ArtworkApp_me
            @arguments(artworkID: $artworkID, loadSidebar: $loadSidebar)
        }
      }
    `,
  },
]
