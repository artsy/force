import React from "react"
import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RedirectException } from "found"
import { AppRouteConfig } from "v2/System/Router/Route"
import {
  buildUrl,
  paramsToCamelCase,
} from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { defaultSort, isValidSort } from "./Utils/IsValidSort"
import { allowedFilters } from "v2/Components/ArtworkFilter/Utils/allowedFilters"
import { data as sd } from "sharify"

const FairApp = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./FairApp"),
  {
    resolveComponent: component => component.FairAppFragmentContainer,
  }
)
const FairSubApp = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./FairSubApp"),
  {
    resolveComponent: component => component.FairSubAppFragmentContainer,
  }
)
const FairOverviewRoute = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./Routes/FairOverview"),
  {
    resolveComponent: component => component.FairOverviewFragmentContainer,
  }
)
const FairExhibitorsRoute = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./Routes/FairExhibitors"),
  {
    resolveComponent: component => component.FairExhibitorsFragmentContainer,
  }
)
const FairBoothsRoute = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./Components/FairBooths"),
  {
    resolveComponent: component => component.FairBoothsFragmentContainer,
  }
)
const FairArtworksRoute = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./Routes/FairArtworks"),
  {
    resolveComponent: component => component.FairArtworksRefetchContainer,
  }
)
const FairArticlesRoute = loadable(
  () => import(/* webpackChunkName: "fairBundle" */ "./Routes/FairArticles"),
  {
    resolveComponent: component => component.FairArticlesPaginationContainer,
  }
)

export const fairRoutes: AppRouteConfig[] = [
  {
    path: "/fair/:slug",
    theme: "v3",
    ignoreScrollBehaviorBetweenChildren: true,
    getComponent: () => FairApp,
    prepare: () => {
      FairApp.preload()
    },
    query: graphql`
      query fairRoutes_FairQuery($slug: String!) {
        fair(id: $slug) @principalField {
          ...FairApp_fair
        }
      }
    `,
    children: [
      {
        path: "",
        theme: "v3",
        getComponent: () => FairOverviewRoute,
        prepare: () => {
          FairOverviewRoute.preload()
        },
        query: graphql`
          query fairRoutes_FairOverviewQuery($slug: String!) {
            fair(id: $slug) @principalField {
              ...FairOverview_fair
            }
          }
        `,
      },
      {
        path: "exhibitors(.*)?",
        theme: "v3",
        getComponent: () => FairExhibitorsRoute,
        prepare: () => {
          FairExhibitorsRoute.preload()
        },
        query: graphql`
          query fairRoutes_FairExhibitorsQuery($slug: String!) {
            fair(id: $slug) @principalField {
              ...FairExhibitors_fair
            }
          }
        `,
      },
      {
        path: "booths(.*)?",
        theme: "v3",
        getComponent: () => FairBoothsRoute,
        prepare: () => {
          FairBoothsRoute.preload()
        },
        prepareVariables: ({ slug }, { location }) => {
          let { sort, page } = location.query
          if (!isValidSort(sort)) {
            sort = defaultSort
          }
          return { sort, page, slug }
        },
        query: graphql`
          query fairRoutes_FairBoothsQuery(
            $slug: String!
            $page: Int
            $sort: ShowSorts
          ) {
            fair(id: $slug) @principalField {
              ...FairBooths_fair @arguments(sort: $sort, page: $page)
            }
          }
        `,
        render: ({ Component, props, match }) => {
          if (!(Component && props)) {
            return undefined
          }

          if (sd.ENABLE_FAIR_PAGE_EXHIBITORS_TAB) {
            const slug = match.params.slug
            throw new RedirectException(`/fair/${slug}`, 301)
          }

          const {
            location: {
              query: { sort, ...otherQuery },
              pathname,
            },
          } = match

          if (!isValidSort(sort)) {
            const url = buildUrl(otherQuery, { pathname })
            throw new RedirectException(url)
          }

          return <Component {...props} />
        },
      },
      {
        path: "artworks(.*)?",
        theme: "v3",
        getComponent: () => FairArtworksRoute,
        prepare: () => {
          FairArtworksRoute.preload()
        },
        prepareVariables: initializeVariablesWithFilterState,
        query: graphql`
          query fairRoutes_FairArtworksQuery(
            $slug: String!
            $input: FilterArtworksInput
            $shouldFetchCounts: Boolean!
            $aggregations: [ArtworkAggregation]
          ) {
            fair(id: $slug) @principalField {
              ...FairArtworks_fair
                @arguments(
                  input: $input
                  shouldFetchCounts: $shouldFetchCounts
                  aggregations: $aggregations
                )
            }
          }
        `,
      },
    ],
  },
  // NOTE: Nested sub-apps are mounted under the same top-level path as above.
  // The root `path: ""` matches the `FairExhibitorsRoute`.
  {
    path: "/fair/:slug",
    theme: "v3",
    getComponent: () => FairSubApp,
    prepare: () => {
      FairSubApp.preload()
    },
    query: graphql`
      query fairRoutes_FairSubAppQuery($slug: String!) {
        fair(id: $slug) @principalField {
          ...FairSubApp_fair
        }
      }
    `,
    children: [
      {
        path: "articles",
        theme: "v3",
        getComponent: () => FairArticlesRoute,
        prepare: () => {
          FairArticlesRoute.preload()
        },
        query: graphql`
          query fairRoutes_FaiArticlesQuery($slug: String!) {
            fair(id: $slug) @principalField {
              ...FairArticles_fair
            }
          }
        `,
      },
    ],
  },
]

function initializeVariablesWithFilterState({ slug }, props) {
  const initialFilterStateFromUrl = props.location ? props.location.query : {}
  const camelCasedFilterStateFromUrl = paramsToCamelCase(
    initialFilterStateFromUrl
  )

  let aggregations: string[] = [
    "TOTAL",
    "MAJOR_PERIOD",
    "ARTIST",
    "LOCATION_CITY",
    "ARTIST_NATIONALITY",
    "MATERIALS_TERMS",
    "PARTNER",
  ]

  const input = {
    sort: "-decayed_merch",
    ...allowedFilters(camelCasedFilterStateFromUrl),
    includeArtworksByFollowedArtists:
      !!props.context.user &&
      camelCasedFilterStateFromUrl["includeArtworksByFollowedArtists"],
    aggregations: !!props.context.user ? ["FOLLOWED_ARTISTS"] : undefined,
  }

  return {
    slug,
    input,
    shouldFetchCounts: !!props.context.user,
    aggregations,
  }
}
