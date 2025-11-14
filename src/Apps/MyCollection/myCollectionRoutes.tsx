import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const MyCollectionArtwork = loadable(
  () =>
    import(
      /* webpackChunkName: "myCollectionBundle" */ "./Routes/MyCollectionArtwork/MyCollectionArtwork"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionArtworkFragmentContainer,
  },
)

const MyCollectionCreateArtwork = loadable(
  () =>
    import(
      /* webpackChunkName: "myCollectionBundle" */ "./Routes/EditArtwork/MyCollectionCreateArtwork"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionCreateArtworkFragmentContainer,
  },
)

const MyCollectionEditArtwork = loadable(
  () =>
    import(
      /* webpackChunkName: "myCollectionBundle" */ "./Routes/EditArtwork/MyCollectionEditArtwork"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionEditArtworkFragmentContainer,
  },
)

export const myCollectionRoutes: RouteProps[] = [
  {
    path: "/my-collection/artwork/:artworkID",
    getComponent: () => MyCollectionArtwork,
    onPreloadJS: () => {
      MyCollectionArtwork.preload()
    },
    query: graphql`
      query myCollectionRoutes_ArtworkQuery($artworkID: String!) {
        artwork(id: $artworkID) @principalField {
          ...MyCollectionArtwork_artwork
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
  {
    path: "/my-collection",
    children: [
      {
        path: "artworks/new",
        layout: "ContainerOnly",
        getComponent: () => MyCollectionCreateArtwork,
        onPreloadJS: () => {
          MyCollectionCreateArtwork.preload()
        },
        query: graphql`
          query myCollectionRoutes_MyCollectionArtworkUploadQuery {
            me {
              ...MyCollectionCreateArtwork_me
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
      {
        path: "artworks/:slug/edit",
        layout: "ContainerOnly",
        getComponent: () => MyCollectionEditArtwork,
        onPreloadJS: () => {
          MyCollectionEditArtwork.preload()
        },
        query: graphql`
          query myCollectionRoutes_MyCollectionArtworkFormQuery(
            $slug: String!
          ) {
            artwork(id: $slug) {
              ...MyCollectionEditArtwork_artwork
            }
          }
        `,
        cacheConfig: {
          force: true,
        },
      },
    ],
  },
]
