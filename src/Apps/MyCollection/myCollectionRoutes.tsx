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

const PriceEstimateConfirmation = loadable(
  () =>
    import(
      /* webpackChunkName: "myCollectionBundle" */ "./Routes/PriceEstimate/PriceEstimateConfirmation"
    ),
  {
    resolveComponent: component => component.PriceEstimateConfirmation,
  }
)

const MyCollectionCreateArtwork = loadable(
  () =>
    import(
      /* webpackChunkName: "myCollectionBundle" */ "./Routes/EditArtwork/MyCollectionCreateArtwork"
    ),
  {
    resolveComponent: component => component.MyCollectionCreateArtwork,
  }
)

const MyCollectionEditArtwork = loadable(
  () =>
    import(
      /* webpackChunkName: "myCollectionBundle" */ "./Routes/EditArtwork/MyCollectionEditArtwork"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionEditArtworkFragmentContainer,
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
    path: "/my-collection/artwork/:artworkID/price-estimate",
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
    path: "/my-collection/artwork/:artworkID/price-estimate/success",
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
        getComponent: () => MyCollectionCreateArtwork,
        onClientSideRender: () => {
          MyCollectionCreateArtwork.preload()
        },
      },
      {
        path: "artworks/:slug/edit",
        hideNav: true,
        hideFooter: true,
        getComponent: () => MyCollectionEditArtwork,
        onClientSideRender: () => {
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
