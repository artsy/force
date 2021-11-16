import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"
import { handleArtworkImageDownload } from "./Server/handleArtworkImageDownload"

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
  {
    path: "/artwork/:artworkID/download/:filename",
    Component: () => null,
    onServerSideRender: handleArtworkImageDownload,
  },
]
