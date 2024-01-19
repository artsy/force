import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"

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
    query: graphql`
      query artworkRoutes_ArtworkQuery($artworkID: String!) {
        artwork(id: $artworkID) {
          ...ArtworkApp_artwork
        }
        me {
          ...ArtworkApp_me
        }
        featuredEventsOrderedSet: orderedSet(id: "529939e2275b245e290004a0") {
          ...ArtworkApp_featuredEventsOrderedSet
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
