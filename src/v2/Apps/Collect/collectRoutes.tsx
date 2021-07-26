import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"
import { graphql } from "react-relay"
import { allowedFilters } from "v2/Components/ArtworkFilter/Utils/allowedFilters"

import { paramsToCamelCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"

const CollectApp = loadable(
  () => import(/* webpackChunkName: "collectBundle" */ "./Routes/Collect"),
  {
    resolveComponent: component => component.CollectAppFragmentContainer,
  }
)
const CollectionsApp = loadable(
  () => import(/* webpackChunkName: "collectBundle" */ "./Routes/Collections"),
  {
    resolveComponent: component => component.CollectionsAppFragmentContainer,
  }
)
const CollectionApp = loadable(
  () => import(/* webpackChunkName: "collectBundle" */ "./Routes/Collection"),
  {
    resolveComponent: component => component.CollectionFragmentContainer,
  }
)

export const collectRoutes: AppRouteConfig[] = [
  {
    path: "/collect/:medium?",
    theme: "v3",
    getComponent: () => CollectApp,
    prepare: () => {
      CollectApp.preload()
    },
    prepareVariables: initializeVariablesWithFilterState,
    query: getArtworkFilterQuery(),
  },
  {
    path: "/collect/color/:color?",
    theme: "v3",
    getComponent: () => CollectApp,
    prepare: () => {
      CollectApp.preload()
    },
    prepareVariables: initializeVariablesWithFilterState,
    query: getArtworkFilterQuery(),
  },
  {
    path: "/collections",
    theme: "v3",
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
    theme: "v3",
    path: "/collection/:slug",
    getComponent: () => CollectionApp,
    prepare: () => {
      CollectionApp.preload()
    },
    prepareVariables: initializeVariablesWithFilterState,
    query: graphql`
      query collectRoutes_CollectionQuery(
        $input: FilterArtworksInput
        $slug: String!
        $aggregations: [ArtworkAggregation]
        $shouldFetchCounts: Boolean!
      ) {
        collection: marketingCollection(slug: $slug) @principalField {
          ...Collection_collection
            @arguments(
              input: $input
              aggregations: $aggregations
              shouldFetchCounts: $shouldFetchCounts
            )
        }
      }
    `,
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
  const collectionOnlyAggregations = collectionSlug
    ? ["MERCHANDISABLE_ARTISTS", "MEDIUM", "MAJOR_PERIOD"]
    : []

  const aggregations = [
    "TOTAL",
    "ARTIST_NATIONALITY",
    "LOCATION_CITY",
    "MATERIALS_TERMS",
    "PARTNER",
    "ARTIST",
  ].concat(collectionOnlyAggregations)

  if (!!props.context.user) {
    aggregations.push("FOLLOWED_ARTISTS")
  }

  const input = {
    sort: "-decayed_merch",
    ...allowedFilters(paramsToCamelCase(initialFilterState)),
    first: 30,
  }

  return {
    input,
    aggregations,
    slug: collectionSlug,
    sort: "-decayed_merch",
    shouldFetchCounts: !!props.context.user,
  }
}

function getArtworkFilterQuery() {
  return graphql`
    query collectRoutes_ArtworkFilterQuery(
      $sort: String
      $input: FilterArtworksInput
      $aggregations: [ArtworkAggregation]
      $shouldFetchCounts: Boolean!
    ) {
      marketingHubCollections {
        ...Collect_marketingHubCollections
      }
      filterArtworks: artworksConnection(sort: $sort, first: 30) {
        ...SeoProductsForArtworks_artworks
      }
      viewer {
        ...ArtworkFilter_viewer @arguments(input: $input)
        artworksConnection(aggregations: $aggregations, input: $input) {
          counts @include(if: $shouldFetchCounts) {
            followedArtists
          }
          aggregations {
            slice
            counts {
              value
              name
              count
            }
          }
        }
      }
    }
  `
}
