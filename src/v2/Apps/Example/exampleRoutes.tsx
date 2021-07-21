import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"
import { graphql } from "react-relay"

const ExampleApp = loadable(
  () => import(/* webpackChunkName: "exampleBundle" */ "./ExampleApp"),
  {
    resolveComponent: component => component.ExampleAppFragmentContainer,
  }
)
const ArtistRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "exampleBundle" */ "./Routes/Artist/ExampleArtistRoute"
    ),
  {
    resolveComponent: component =>
      component.ExampleArtistRouteFragmentContainer,
  }
)
const ArtworkRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "exampleBundle" */ "./Routes/Artwork/ExampleArtworkRoute"
    ),
  {
    resolveComponent: component =>
      component.ExampleArtworkRouteFragmentContainer,
  }
)
const ArtworkFilterRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "exampleBundle" */ "./Routes/ArtworkFilter/ExampleArtworkFilterRoute"
    ),
  {
    resolveComponent: component =>
      component.ExampleArtworkFilterFragmentContainer,
  }
)
const WelcomeRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "exampleBundle" */ "./Routes/Welcome/WelcomeRoute"
    ),
  {
    resolveComponent: component => component.WelcomeRoute,
  }
)

export const exampleRoutes: AppRouteConfig[] = [
  {
    path: "/example",
    getComponent: () => ExampleApp,
    prepare: () => {
      ExampleApp.preload()
    },
    query: graphql`
      query exampleRoutes_ExampleQuery {
        system {
          ...ExampleApp_system
        }
      }
    `,
    children: [
      {
        path: "",
        Component: WelcomeRoute,
      },
      {
        path: "artist/:slug",
        getComponent: () => ArtistRoute,
        prepare: () => {
          ArtistRoute.preload()
        },
        query: graphql`
          query exampleRoutes_ArtistQuery($slug: String!) {
            artist(id: $slug) @principalField {
              id
              ...ExampleArtistRoute_artist
            }
          }
        `,
      },
      {
        path: "artwork/:slug",
        getComponent: () => ArtworkRoute,
        prepare: () => {
          ArtworkRoute.preload()
        },
        query: graphql`
          query exampleRoutes_ArtworkQuery($slug: String!) {
            artwork(id: $slug) {
              id
              ...ExampleArtworkRoute_artwork
            }
          }
        `,
      },
      {
        path: "artwork-filter/:slug",
        getComponent: () => ArtworkFilterRoute,
        prepare: () => {
          ArtworkRoute.preload()
        },
        query: graphql`
          query exampleRoutes_TagQuery(
            $slug: String!
            $input: FilterArtworksInput
          ) {
            tag(id: $slug) @principalField {
              ...ExampleArtworkFilterRoute_tag @arguments(input: $input)
            }
          }
        `,
      },
    ],
  },
]
