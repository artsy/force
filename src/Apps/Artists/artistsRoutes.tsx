import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const ArtistsApp = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./ArtistsApp"),
  {
    resolveComponent: component => component.ArtistsApp,
  },
)

const ArtistsIndexRoute = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./Routes/ArtistsIndex"),
  {
    resolveComponent: component => component.ArtistsIndexFragmentContainer,
  },
)

const ArtistsByLetterRoute = loadable(
  () =>
    import(/* webpackChunkName: "artistBundle" */ "./Routes/ArtistsByLetter"),
  {
    resolveComponent: component => component.ArtistsByLetterFragmentContainer,
  },
)

export const artistsRoutes: RouteProps[] = [
  {
    path: "/artists",
    getComponent: () => ArtistsApp,
    onPreloadJS: () => {
      ArtistsApp.preload()
    },
    children: [
      {
        path: "",
        getComponent: () => ArtistsIndexRoute,
        onPreloadJS: () => {
          ArtistsIndexRoute.preload()
        },
        query: graphql`
          query artistsRoutes_ArtistsQuery @cacheable {
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
        path: "artists-starting-with-:letter([a-zA-Z])",
        getComponent: () => ArtistsByLetterRoute,
        onPreloadJS: () => {
          ArtistsByLetterRoute.preload()
        },
        prepareVariables: (params, props) => {
          return {
            ...params,
            ...props,
            page: Number.parseInt(props.location.query.page, 10) || 1,
            size: 100,
          }
        },
        query: graphql`
          query artistsRoutes_ArtistsByLetterQuery(
            $letter: String!
            $page: Int
            $size: Int
          ) @cacheable {
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
