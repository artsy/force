import { getInitialFilterState } from "Components/ArtworkFilter/Utils/getInitialFilterState"
import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { graphql } from "react-relay"

const CollectApp = loadable(
  () => import(/* webpackChunkName: "collectBundle" */ "./Routes/Collect"),
  {
    resolveComponent: component => component.CollectAppFragmentContainer,
  },
)
const CollectionsApp = loadable(
  () => import(/* webpackChunkName: "collectBundle" */ "./Routes/Collections"),
  {
    resolveComponent: component => component.CollectionsAppFragmentContainer,
  },
)
const CollectionApp = loadable(
  () => import(/* webpackChunkName: "collectBundle" */ "./Routes/Collection"),
  {
    resolveComponent: component => component.CollectionFragmentContainer,
  },
)

export const collectRoutes: RouteProps[] = [
  {
    path: "/collect/:medium?",
    getComponent: () => CollectApp,
    onPreloadJS: () => {
      CollectApp.preload()
    },
    prepareVariables: initializeVariablesWithFilterState,
    query: getArtworkFilterQuery(),
  },
  {
    path: "/collect/color/:color?",
    getComponent: () => CollectApp,
    onPreloadJS: () => {
      CollectApp.preload()
    },
    prepareVariables: initializeVariablesWithFilterState,
    query: getArtworkFilterQuery(),
  },
  {
    path: "/collections",
    getComponent: () => CollectionsApp,
    onPreloadJS: () => {
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
    onPreloadJS: () => {
      CollectionApp.preload()
    },
    prepareVariables: initializeVariablesWithFilterState,
    query: graphql`
      query collectRoutes_CollectionQuery($slug: String!) {
        collection: marketingCollection(slug: $slug) @principalField {
          ...Collection_collection
        }
      }
    `,
  },
]

export function initializeVariablesWithFilterState(params, props) {
  const initialFilterState = getInitialFilterState(props.location?.query ?? {})

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

  const input = {
    sort: "-decayed_merch",
    ...initialFilterState,
    first: 30,
  }

  return {
    aggregations,
    input,
    slug: collectionSlug,
    sort: "-decayed_merch",
    shouldFetchCounts: !!props.context.user,
  }
}

function getArtworkFilterQuery() {
  return graphql`
    query collectRoutes_ArtworkFilterQuery {
      marketingCollections(
        slugs: [
          "contemporary"
          "painting"
          "street-art"
          "photography"
          "emerging-art"
          "20th-century-art"
        ]
      ) {
        ...Collect_marketingCollections
      }
    }
  `
}
