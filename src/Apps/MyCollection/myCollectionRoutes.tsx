import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"

const MyCollectionArtwork = loadable(
  () =>
    import(
      /* webpackChunkName: "myCollectionBundle" */ "./Routes/MyCollectionArtwork/MyCollectionArtwork"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionArtworkFragmentContainer,
  }
)

const MyCollectionArtworkFormFragmentContainer = loadable(
  () =>
    import(
      /* webpackChunkName: "myCollectionBundle" */ "./Routes/EditArtwork/MyCollectionArtworkForm"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionArtworkFormFragmentContainer,
  }
)

const PriceEstimateConfirmation = loadable(
  () =>
    import(
      /* webpackChunkName: "myCollectionBundle" */ "./Routes/PriceEstimate/PriceEstimateConfirmation"
    ),
  {
    resolveComponent: component => component.PriceEstimateConfirmation,
  }
)

const MyCollectionArtworkForm = loadable(
  () =>
    import(
      /* webpackChunkName: "myCollectionBundle" */ "./Routes/EditArtwork/MyCollectionArtworkForm"
    ),
  {
    resolveComponent: component => component.MyCollectionArtworkForm,
  }
)

export const myCollectionRoutes: AppRouteConfig[] = [
  {
    path: "/my-collection/artwork/:artworkID",
    getComponent: () => MyCollectionArtwork,
    onClientSideRender: () => {
      MyCollectionArtwork.preload()
    },
    prepareVariables: ({ artworkID }) => {
      return {
        artworkID,
      }
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
    path: "/my-collection/artwork/:artworkID/price-estimate/confirmation",
    hideNav: true,
    hideFooter: true,
    getComponent: () => PriceEstimateConfirmation,
    onClientSideRender: () => {
      PriceEstimateConfirmation.preload()
    },
  },
  {
    path: "/my-collection",
    children: [
      {
        path: "artworks/new",
        hideNav: true,
        hideFooter: true,
        getComponent: () => MyCollectionArtworkForm,
        onClientSideRender: () => {
          MyCollectionArtworkForm.preload()
        },
      },
      {
        path: "artworks/:slug/edit",
        hideNav: true,
        hideFooter: true,
        getComponent: () => MyCollectionArtworkFormFragmentContainer,
        onClientSideRender: () => {
          MyCollectionArtworkFormFragmentContainer.preload()
        },
        query: graphql`
          query myCollectionRoutes_MyCollectionArtworkFormQuery(
            $slug: String!
          ) {
            artwork(id: $slug) {
              ...MyCollectionArtworkForm_artwork
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
