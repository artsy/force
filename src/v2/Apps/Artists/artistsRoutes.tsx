import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"

const ArtistsApp = loadable(() => import("./ArtistsApp"))

export const artistsRoutes: RouteConfig[] = [
  {
    getComponent: () => ArtistsApp,
    path: "/artists",
    prepare: () => {
      return ArtistsApp.preload()
    },
    query: graphql`
      query artistsRoutes_ArtistsQuery {
        featuredArtists: orderedSets(key: "homepage:featured-artists") {
          ...ArtistsApp_featuredArtists
        }
        featuredGenes: orderedSets(key: "artists:featured-genes") {
          ...ArtistsApp_featuredGenes
        }
      }
    `,
  },
]
