import { AppRouteConfig } from "v2/System/Router/Route"
import { omit } from "lodash"
import React from "react"
import { graphql } from "react-relay"
import loadable from "@loadable/component"

import { RouteSpinner } from "v2/System/Relay/renderWithLoadProgress"
import { allowedFilters } from "v2/Components/ArtworkFilter/Utils/allowedFilters"
import { paramsToCamelCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"

const SearchResultsArtistsRouteFragmentContainer = loadable(
  () =>
    import(
      /* webpackChunkName: "searchBundle" */ "./Routes/Artists/SearchResultsArtists"
    ),
  {
    resolveComponent: component =>
      component.SearchResultsArtistsRouteFragmentContainer,
  }
)
const SearchResultsArtworksRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "searchBundle" */ "./Routes/SearchResultsArtworks"
    ),
  {
    resolveComponent: component =>
      component.SearchResultsArtworksRouteFragmentContainer,
  }
)
const SearchResultsEntityRouteFragmentContainer = loadable(
  () =>
    import(
      /* webpackChunkName: "searchBundle" */ "./Routes/Entity/SearchResultsEntity"
    ),
  {
    resolveComponent: component =>
      component.SearchResultsEntityRouteFragmentContainer,
  }
)
const SearchAppFragmentContainer = loadable(
  () => import(/* webpackChunkName: "searchBundle" */ "./SearchApp"),
  {
    resolveComponent: component => component.SearchAppFragmentContainer,
  }
)

const prepareVariables = (_params, { location }) => {
  const aggregations = [
    "TOTAL",
    "ARTIST_NATIONALITY",
    "LOCATION_CITY",
    "MATERIALS_TERMS",
    "PARTNER",
  ]

  return {
    ...paramsToCamelCase(omit(location.query, "term")),
    keyword: location.query.term.toString(),
    aggregations,
  }
}

const tabsToEntitiesMap = {
  artist_series: ["ARTIST_SERIES"],
  collections: ["COLLECTION"],
  shows: ["SHOW"],
  fairs: ["FAIR"],
  institutions: ["INSTITUTION"],
  galleries: ["GALLERY"],
  categories: ["GENE"],
  articles: ["ARTICLE"],
  auctions: ["SALE"],
  more: ["TAG", "CITY", "FEATURE", "PAGE"],
}

const entityTabs = Object.entries(tabsToEntitiesMap).map(([key, entities]) => {
  return {
    path: key,
    Component: SearchResultsEntityRouteFragmentContainer,

    // FIXME: We shouldn't overwrite our route functionality, as that breaks
    // global route configuration behavior.
    render: ({ props, Component }: { props?: any; Component?: any }) => {
      if (!props) {
        return <RouteSpinner />
      }
      return <Component {...props} tab={key} entities={entities} />
    },
    prepareVariables: (params, { location }) => {
      return {
        ...prepareVariables(params, { location }),
        entities,
      }
    },
    query: graphql`
      query searchRoutes_SearchResultsEntityQuery(
        $keyword: String!
        $entities: [SearchEntity]
        $page: Int
      ) {
        viewer {
          ...SearchResultsEntity_viewer
            @arguments(term: $keyword, entities: $entities, page: $page)
        }
      }
    `,
  }
})

export const searchRoutes: AppRouteConfig[] = [
  {
    path: "/search",
    Component: SearchAppFragmentContainer,
    query: graphql`
      query searchRoutes_SearchResultsTopLevelQuery($keyword: String!) {
        viewer {
          ...SearchApp_viewer @arguments(term: $keyword)
        }
      }
    `,
    prepareVariables,
    children: [
      {
        path: "/",
        Component: SearchResultsArtworksRoute,
        prepareVariables: (params, { location, context }) => {
          const {
            aggregations: sourceAggregations,
            ...other
          } = prepareVariables(params, {
            location,
          })
          const aggregations = [...sourceAggregations, "ARTIST"]

          if (!!context.user) {
            aggregations.push("FOLLOWED_ARTISTS")
          }

          return {
            shouldFetchCounts: !!context.user,
            input: {
              ...allowedFilters(other),
              first: 30,
              aggregations,
            },
          }
        },
        query: graphql`
          query searchRoutes_ArtworksViewerQuery(
            $input: FilterArtworksInput
            $shouldFetchCounts: Boolean!
          ) {
            viewer {
              ...SearchResultsArtworks_viewer
                @arguments(input: $input, shouldFetchCounts: $shouldFetchCounts)
            }
          }
        `,
      },
      {
        path: "artists",
        Component: SearchResultsArtistsRouteFragmentContainer,
        prepareVariables,
        query: graphql`
          query searchRoutes_SearchResultsArtistsQuery(
            $keyword: String!
            $page: Int
          ) {
            viewer {
              ...SearchResultsArtists_viewer
                @arguments(term: $keyword, page: $page)
            }
          }
        `,
      },
      ...entityTabs,
    ],
  },
]
