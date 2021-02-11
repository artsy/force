import loadable from "@loadable/component"
import { RouteConfig } from "found"
import { graphql } from "react-relay"

import { paramsToCamelCase } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import { CollectionAppQuery } from "./Routes/Collection/CollectionAppQuery"

const CollectApp = loadable(() => import("./Routes/Collect"), {
  resolveComponent: component => component.CollectAppFragmentContainer,
})
const CollectionsApp = loadable(() => import("./Routes/Collections"), {
  resolveComponent: component => component.CollectionsAppFragmentContainer,
})
const CollectionApp = loadable(() => import("./Routes/Collection"), {
  resolveComponent: component => component.CollectionRefetchContainer,
})

export const collectRoutes: RouteConfig[] = [
  {
    path: "/collect/:medium?",
    getComponent: () => CollectApp,
    prepare: () => {
      CollectApp.preload()
    },
    prepareVariables: initializeVariablesWithFilterState,
    query: getArtworkFilterQuery(),
  },
  {
    path: "/collect/color/:color?",
    getComponent: () => CollectApp,
    prepare: () => {
      CollectApp.preload()
    },
    prepareVariables: initializeVariablesWithFilterState,
    query: getArtworkFilterQuery(),
  },
  {
    path: "/collections",
    getComponent: () => CollectionsApp,
    prepare: () => {
      CollectionsApp.preload()
    },
    query: graphql`
      query collectRoutes_MarketingCollectionsAppQuery {
        marketingCategories @principalField {
          ...Collections_marketingCategories
        }
      }
    `,
  },
  {
    path: "/collection/:slug",
    getComponent: () => CollectionApp,
    prepare: () => {
      CollectionApp.preload()
    },
    prepareVariables: initializeVariablesWithFilterState,
    query: CollectionAppQuery,
  },
]

function initializeVariablesWithFilterState(params, props) {
  const initialFilterState = props.location ? props.location.query : {}

  if (params.medium) {
    initialFilterState.medium = params.medium

    if (props.location.query) {
      props.location.query.medium = params.medium
    }
  }

  if (params.color) {
    initialFilterState.color = params.color

    if (props.location.query) {
      props.location.query.color = params.color
    }
  }

  const state = {
    sort: "-decayed_merch",
    ...paramsToCamelCase(initialFilterState),
    ...params,
  }

  return state
}

function getArtworkFilterQuery() {
  return graphql`
    query collectRoutes_ArtworkFilterQuery(
      $acquireable: Boolean
      $aggregations: [ArtworkAggregation] = [TOTAL]
      $artistID: String
      $atAuction: Boolean
      $attributionClass: [String]
      $color: String
      $forSale: Boolean
      $additionalGeneIDs: [String]
      $height: String
      $inquireableOnly: Boolean
      $majorPeriods: [String]
      $medium: String
      $offerable: Boolean
      $page: Int
      $partnerID: ID
      $partnerIDs: [String]
      $priceRange: String
      $sizes: [ArtworkSizes]
      $sort: String
      $keyword: String
      $width: String
    ) {
      marketingHubCollections {
        ...Collect_marketingHubCollections
      }
      filterArtworks: artworksConnection(
        aggregations: $aggregations
        sort: $sort
        first: 30
      ) {
        ...SeoProductsForArtworks_artworks
      }
      viewer {
        ...ArtworkFilter_viewer
          @arguments(
            acquireable: $acquireable
            aggregations: $aggregations
            artistID: $artistID
            atAuction: $atAuction
            attributionClass: $attributionClass
            color: $color
            forSale: $forSale
            additionalGeneIDs: $additionalGeneIDs
            height: $height
            inquireableOnly: $inquireableOnly
            keyword: $keyword
            majorPeriods: $majorPeriods
            medium: $medium
            offerable: $offerable
            page: $page
            partnerID: $partnerID
            partnerIDs: $partnerIDs
            priceRange: $priceRange
            sizes: $sizes
            sort: $sort
            width: $width
          )
      }
    }
  `
}
