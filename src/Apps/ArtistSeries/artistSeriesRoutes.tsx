import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const ArtistSeriesApp = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./ArtistSeriesApp"),
  {
    resolveComponent: component => component.ArtistSeriesAppFragmentContainer,
  },
)

export const artistSeriesRoutes: RouteProps[] = [
  {
    path: "/artist-series/:slug",
    getComponent: () => ArtistSeriesApp,
    onPreloadJS: () => {
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
