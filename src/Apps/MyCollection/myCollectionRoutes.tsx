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

const PriceEstimateContactInformation = loadable(
  () =>
    import(
      /* webpackChunkName: "myCollectionBundle" */ "./Routes/PriceEstimate/PriceEstimateContactInformation"
    ),
  {
    resolveComponent: component =>
      component.PriceEstimateContactInformationFragmentContainer,
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
    path: "/my-collection/artwork/:artworkID/request-for-price-estimate",
    hideNav: true,
    hideFooter: true,
    getComponent: () => PriceEstimateContactInformation,
    onClientSideRender: () => {
      PriceEstimateContactInformation.preload()
    },
    query: graphql`
      query myCollectionRoutes_priceEstimateContactInformationQuery(
        $artworkID: String!
      ) {
        artwork(id: $artworkID) @principalField {
          ...PriceEstimateContactInformation_artwork
        }
        me {
          ...PriceEstimateContactInformation_me
        }
      }
    `,
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
