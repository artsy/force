import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

const ArtistsApp = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./ArtistsApp"),
  {
    resolveComponent: component => component.ArtistsApp,
  }
)

const ArtistsIndexRoute = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./Routes/ArtistsIndex"),
  {
    resolveComponent: component => component.ArtistsIndexFragmentContainer,
  }
)

const ArtistsByLetterRoute = loadable(
  () =>
    import(/* webpackChunkName: "artistBundle" */ "./Routes/ArtistsByLetter"),
  {
    resolveComponent: component => component.ArtistsByLetterFragmentContainer,
  }
)

export const artistsRoutes: AppRouteConfig[] = [
  {
    path: "/artists",
    getComponent: () => ArtistsApp,
    prepare: () => {
      return ArtistsApp.preload()
    },
    children: [
      {
        theme: "v3",
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
        theme: "v3",
        path: "artists-starting-with-:letter([a-zA-Z])",
        getComponent: () => ArtistsByLetterRoute,
        prepare: () => {
          return ArtistsByLetterRoute.preload()
        },
        prepareVariables: (params, props) => {
          return {
            ...params,
            ...props,
            page: props.location.query.page ?? 1,
            size: 100,
          }
        },
        query: graphql`
          query artistsRoutes_ArtistsByLetterQuery(
            $letter: String!
            $page: Int
            $size: Int
          ) {
            viewer {
              ...ArtistsByLetter_viewer
                @arguments(letter: $letter, size: $size, page: $page)
            }
          }
        `,
      },
    ],
  },
]
