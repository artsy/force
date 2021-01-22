import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { WelcomeApp } from "./Routes/Welcome/WelcomeApp"

const ExampleApp = loadable(() => import("./Routes/Example/ExampleApp"), {
  resolveComponent: component => component.ExampleAppFragmentContainer,
})

const ArtistApp = loadable(
  () => import("./Routes/ExampleArtist/ExampleArtistApp"),
  {
    resolveComponent: component => component.ExampleArtistAppFragmentContainer,
  }
)

const ArtworkApp = loadable(
  () => import("./Routes/ExampleArtwork/ExampleArtworkApp"),
  {
    resolveComponent: component => component.ExampleArtworkAppFragmentContainer,
  }
)

export const exampleRoutes = [
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
        Component: WelcomeApp,
      },
      {
        path: "artist/:slug",
        getComponent: () => ArtistApp,
        prepare: () => {
          ArtistApp.preload()
        },
        query: graphql`
          query exampleRoutes_ArtistQuery($slug: String!) {
            artist(id: $slug) @principalField {
              id
              ...ExampleArtistApp_artist
            }
          }
        `,
      },
      {
        path: "artwork/:slug",
        getComponent: () => ArtworkApp,
        prepare: () => {
          ArtworkApp.preload()
        },
        query: graphql`
          query exampleRoutes_ArtworkQuery($slug: String!) {
            artwork(id: $slug) {
              id
              ...ExampleArtworkApp_artwork
            }
          }
        `,
      },
    ],
  },
]
