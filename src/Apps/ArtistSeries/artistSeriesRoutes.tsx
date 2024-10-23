import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"
import { serverCacheTTLs } from "Apps/serverCacheTTLs"

const ArtistSeriesApp = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./ArtistSeriesApp"),
  {
    resolveComponent: component => component.ArtistSeriesAppFragmentContainer,
  }
)

export const artistSeriesRoutes: RouteProps[] = [
  {
    path: "/artist-series/:slug",
    serverCacheTTL: serverCacheTTLs.artistSeries,
    getComponent: () => ArtistSeriesApp,
    onClientSideRender: () => {
      ArtistSeriesApp.preload()
    },
    query: graphql`
      query artistSeriesRoutes_ArtistSeriesQuery($slug: ID!) {
        artistSeries(id: $slug) @principalField {
          ...ArtistSeriesApp_artistSeries
        }
      }
    `,
  },
]
