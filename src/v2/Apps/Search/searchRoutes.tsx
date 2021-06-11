import { AppRouteConfig } from "v2/System/Router/Route"
import { omit } from "lodash"
import React from "react"
import { graphql } from "react-relay"

import { RouteSpinner } from "v2/System/Relay/renderWithLoadProgress"
import { ArtworkQueryFilter } from "v2/Components/ArtworkFilter/ArtworkQueryFilter"
import { allowedFilters } from "v2/Components/ArtworkFilter/Utils/allowedFilters"
import { paramsToCamelCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { getENV } from "v2/Utils/getENV"

import { SearchResultsArtistsRouteFragmentContainer } from "./Routes/Artists/SearchResultsArtists"
import { SearchResultsArtworksRoute } from "./Routes/Artworks"
import { SearchResultsEntityRouteFragmentContainer } from "./Routes/Entity/SearchResultsEntity"
import { SearchAppFragmentContainer } from "./SearchApp"

const prepareVariables = (_params, { location }) => {
  const aggregations = ["TOTAL"]
  const additionalAggregations = getENV("ENABLE_NEW_ARTWORK_FILTERS")
    ? ["ARTIST_NATIONALITY", "LOCATION_CITY", "MATERIALS_TERMS", "PARTNER"]
    : []
  return {
    ...paramsToCamelCase(omit(location.query, "term")),
    keyword: location.query.term.toString(),
    aggregations: aggregations.concat(additionalAggregations),
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
        prepareVariables: (params, { location }) => {
          return {
            input: {
              ...allowedFilters(prepareVariables(params, { location })),
              first: 30,
            },
          }
        },
        query: ArtworkQueryFilter,
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
