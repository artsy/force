/* eslint-disable sort-keys-fix/sort-keys-fix */
import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { WelcomeApp } from "./Routes/Welcome/WelcomeApp"

const ExampleApp = loadable(() => import("./Routes/Example/ExampleApp"), {
  resolveComponent: component => component.ExampleApp,
})

const ArtistApp = loadable(() => import("./Routes/Artist/ArtistApp"), {
  resolveComponent: component => component.ArtistApp,
})

const ArtworkApp = loadable(() => import("./Routes/Artwork/ArtworkApp"), {
  resolveComponent: component => component.ArtworkApp,
})

export const exampleRoutes = [
  {
    path: "/example",
    getComponent: () => ExampleApp,
    prepare: () => {
      ExampleApp.preload()
    },
    query: graphql`
      query exampleRoutes_ExampleQuery {
        me {
          id
          # ...ExampleApp_me
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
            artist(id: $slug) {
              id
              # ...ArtistApp_artist
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
              # ...ArtworkApp_artwork
            }
          }
        `,
      },
    ],
  },
]
