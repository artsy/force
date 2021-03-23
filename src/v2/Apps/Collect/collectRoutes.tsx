import loadable from "@loadable/component"
import { RouteConfig } from "found"
import { graphql } from "react-relay"
import { allowedFilters } from "v2/Components/v2/ArtworkFilter/Utils/allowedFilters"

import { paramsToCamelCase } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import { getENV } from "v2/Utils/getENV"
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
    initialFilterState.colors = [params.color]

    if (props.location.query) {
      props.location.query.colors = [params.color]
    }
  }

  const collectionSlug = params.slug

  // TODO: Do these aggregations accomplish much on /collect?
  const additionalAggregations = getENV("ENABLE_NEW_ARTWORK_FILTERS")
    ? ["LOCATION_CITY", "ARTIST_NATIONALITY", "MATERIALS_TERMS"]
    : []
  const collectionOnlyAggregations = collectionSlug
    ? ["MERCHANDISABLE_ARTISTS", "MEDIUM", "MAJOR_PERIOD"]
    : []
  const aggregations = ["TOTAL"]
    .concat(additionalAggregations)
    .concat(collectionOnlyAggregations)

  const input = {
    sort: "-decayed_merch",
    ...allowedFilters(paramsToCamelCase(initialFilterState)),
    first: 30,
    aggregations,
  }

  return {
    input,
    aggregations,
    slug: collectionSlug,
    sort: "-decayed_merch",
  }
}

function getArtworkFilterQuery() {
  return graphql`
    query collectRoutes_ArtworkFilterQuery(
      $sort: String
      $input: FilterArtworksInput
    ) {
      marketingHubCollections {
        ...Collect_marketingHubCollections
      }
      filterArtworks: artworksConnection(sort: $sort, first: 30) {
        ...SeoProductsForArtworks_artworks
      }
      viewer {
        ...ArtworkFilter_viewer @arguments(input: $input)
      }
    }
  `
}
