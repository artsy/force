import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"
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

const AddToCollectionRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "exampleBundle" */ "./Routes/AddToCollection/AddToCollectionRoute"
    ),
  {
    resolveComponent: component =>
      component.AddToCollectionRouteFragmentContainer,
  }
)

const SearchRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "exampleBundle" */ "./Routes/Search/SearchRoute"
    ),
  {
    resolveComponent: component => component.SearchRoute,
  }
)

export const exampleRoutes: RouteProps[] = [
  {
    path: "/example",
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
        Component: WelcomeRoute,
      },
      {
        path: "artist/:slug",
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
      {
        path: "add-to-collection",
        getComponent: () => AddToCollectionRoute,
        onClientSideRender: () => {
          AddToCollectionRoute.preload()
        },
        query: graphql`
          query exampleRoutes_AddToCollectionRouteQuery {
            viewer {
              ...AddToCollectionRoute_viewer
            }
          }
        `,
      },
      {
        path: "search",
        getComponent: () => SearchRoute,
        onClientSideRender: () => {
          SearchRoute.preload()
        },
      },
    ],
  },
]
