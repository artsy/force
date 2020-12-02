/* eslint-disable sort-keys-fix/sort-keys-fix */
import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"

const ArtistsApp = loadable(() => import("./ArtistsApp"), {
  resolveComponent: component => component.ArtistsApp,
})

const ArtistsIndexRoute = loadable(() => import("./Routes/ArtistsIndex"), {
  resolveComponent: component => component.ArtistsIndexFragmentContainer,
})

const ArtistsByLetterRoute = loadable(
  () => import("./Routes/ArtistsByLetter"),
  {
    resolveComponent: component => component.ArtistsByLetterFragmentContainer,
  }
)

export const artistsRoutes: RouteConfig[] = [
  {
    path: "/artists2",
    getComponent: () => ArtistsApp,
    prepare: () => {
      return ArtistsApp.preload()
    },
    children: [
      {
        path: "",
        getComponent: () => ArtistsIndexRoute,
        prepare: () => {
          return ArtistsIndexRoute.preload()
        },
        query: graphql`
          query artistsRoutes_ArtistsQuery {
            featuredArtists: orderedSets(key: "homepage:featured-artists") {
              ...ArtistsIndex_featuredArtists
            }
            featuredGenes: orderedSets(key: "artists:featured-genes") {
              ...ArtistsIndex_featuredGenes
            }
          }
        `,
      },

      {
        path: "artists-starting-with-:letter",
        getComponent: () => ArtistsByLetterRoute,
        prepare: () => {
          return ArtistsByLetterRoute.preload()
        },
        prepareVariables: (params, props) => {
          return {
            ...params,
            ...props,
            first: 100,
          }
        },
        query: graphql`
          query artistsRoutes_ArtistsByLetterQuery(
            $letter: String!
            $first: Int
            $after: String
          ) {
            viewer {
              ...ArtistsByLetter_viewer
                @arguments(letter: $letter, first: $first, after: $after)
            }
          }
        `,
      },
    ],
  },
]
