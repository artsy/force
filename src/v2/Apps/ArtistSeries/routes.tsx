import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"
// import React from "react"

const ArtistSeriesApp = loadable(() => import("./ArtistSeriesApp"))

// const ArtistSeriesApp = props => <h1>{props.artistSeries.internalID}</h1>

export const routes: RouteConfig[] = [
  {
    path: "/artist-series/:slug",
    getComponent: () => ArtistSeriesApp,
    prepare: () => {
      ArtistSeriesApp.preload()
    },
    query: graphql`
      query routes_ArtistSeriesQuery($slug: ID!) {
        artistSeries(id: $slug) {
          ...ArtistSeriesApp_artistSeries
        }
      }
    `,
  },
]
