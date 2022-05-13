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
    theme: "v3",
    getComponent: () => ExampleApp,
    onClientSideRender: () => {
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
        theme: "v3",
        Component: WelcomeRoute,
      },
      {
        path: "artist/:slug",
        theme: "v3",
        getComponent: () => ArtistRoute,
        onClientSideRender: () => {
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
        theme: "v3",
        getComponent: () => ArtworkRoute,
        onClientSideRender: () => {
          ArtworkRoute.preload()
        },
        query: graphql`
          query exampleRoutes_ArtworkQuery($slug: String!) {
            artwork(id: $slug) @principalField {
              id
              ...ExampleArtworkRoute_artwork
            }
          }
        `,
      },
      {
        path: "artwork-filter",
        theme: "v3",
        getComponent: () => ArtworkFilterRoute,
        onClientSideRender: () => {
          ArtworkRoute.preload()
        },
        query: graphql`
          query exampleRoutes_ArtworkFilterQuery($input: FilterArtworksInput) {
            viewer {
              ...ExampleArtworkFilterRoute_viewer @arguments(input: $input)
            }
          }
        `,
        prepareVariables: () => {
          return {
            input: {
              first: 10,
            },
          }
        },
      },
    ],
  },
]
