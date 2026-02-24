import loadable from "@loadable/component"
import { allowedFilters } from "Components/ArtworkFilter/Utils/allowedFilters"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import type { RouteProps } from "System/Router/Route"
import omit from "lodash/omit"
import { graphql } from "react-relay"
import { redirectQueryToTerm } from "./Server/redirectQueryToTerm"

const SearchResultsArtists = loadable(
  () =>
    import(
      /* webpackChunkName: "searchBundle" */ "./Routes/SearchResultsArtists"
    ),
  {
    resolveComponent: component =>
      component.SearchResultsArtistsRouteFragmentContainer,
  },
)
const SearchResultsArtworks = loadable(
  () =>
    import(
      /* webpackChunkName: "searchBundle" */ "./Routes/SearchResultsArtworks"
    ),
  {
    resolveComponent: component =>
      component.SearchResultsArtworksRouteFragmentContainer,
  },
)
const SearchResultsEntity = loadable(
  () =>
    import(
      /* webpackChunkName: "searchBundle" */ "./Routes/SearchResultsEntity"
    ),
  {
    resolveComponent: component =>
      component.SearchResultsEntityRouteFragmentContainer,
  },
)
const SearchApp = loadable(
  () => import(/* webpackChunkName: "searchBundle" */ "./SearchApp"),
  {
    resolveComponent: component => component.SearchAppFragmentContainer,
  },
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
    getComponent: () => SearchResultsEntity,
    onPreloadJS: () => {
      SearchResultsEntity.preload()
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

export const searchRoutes: RouteProps[] = [
  {
    path: "/search",
    getComponent: () => SearchApp,
    onServerSideRender: redirectQueryToTerm,
    onPreloadJS: () => {
      SearchApp.preload()
    },
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
        path: "",
        getComponent: () => SearchResultsArtworks,
        onPreloadJS: () => {
          SearchResultsArtworks.preload()
        },
        prepareVariables: (params, { location, context }) => {
          const { aggregations: sourceAggregations, ...other } =
            prepareVariables(params, {
              location,
            })
          const input: Record<string, any> = {
            ...allowedFilters(other),
            first: 30,
          }
          const aggregations = [...sourceAggregations, "ARTIST"]

          return {
            shouldFetchCounts: !!context.user,
            input,
            sidebarInput: {
              aggregations,
              keyword: input.keyword,
            },
          }
        },
        query: graphql`
          query searchRoutes_ArtworksViewerQuery(
            $input: FilterArtworksInput
            $sidebarInput: FilterArtworksInput
            $shouldFetchCounts: Boolean!
          ) {
            viewer {
              ...SearchResultsArtworks_viewer
                @arguments(
                  input: $input
                  sidebarInput: $sidebarInput
                  shouldFetchCounts: $shouldFetchCounts
                )
            }
          }
        `,
      },
      {
        path: "artists",
        getComponent: () => SearchResultsArtists,
        onPreloadJS: () => {
          SearchResultsArtists.preload()
        },
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
