import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"
import { paramsToCamelCase } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import { getENV } from "v2/Utils/getENV"

const FairApp = loadable(() => import("./FairApp"), {
  resolveComponent: component => component.FairAppFragmentContainer,
})
const FairSubApp = loadable(() => import("./FairSubApp"), {
  resolveComponent: component => component.FairSubAppFragmentContainer,
})
const FairExhibitorsRoute = loadable(() => import("./Routes/FairExhibitors"), {
  resolveComponent: component => component.FairExhibitorsFragmentContainer,
})
const FairArtworksRoute = loadable(() => import("./Routes/FairArtworks"), {
  resolveComponent: component => component.FairArtworksRefetchContainer,
})
const FairInfoRoute = loadable(() => import("./Routes/FairInfo"), {
  resolveComponent: component => component.FairInfoFragmentContainer,
})
const FairArticlesRoute = loadable(() => import("./Routes/FairArticles"), {
  resolveComponent: component => component.FairArticlesPaginationContainer,
})

export const fairRoutes: RouteConfig[] = [
  {
    path: "/fair/:slug",
    ignoreScrollBehavior: true,
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
        path: "artworks(.*)?",
        getComponent: () => FairArtworksRoute,
        prepare: () => {
          FairArtworksRoute.preload()
        },
        prepareVariables: initializeVariablesWithFilterState,
        query: graphql`
          query fairRoutes_FairArtworksQuery(
            $slug: String!
            $acquireable: Boolean
            $aggregations: [ArtworkAggregation]
            $artistIDs: [String]
            $atAuction: Boolean
            $attributionClass: [String]
            $colors: [String]
            $forSale: Boolean
            $includeArtworksByFollowedArtists: Boolean
            $inquireableOnly: Boolean
            $majorPeriods: [String]
            $medium: String
            $offerable: Boolean
            $page: Int
            $partnerID: ID
            $priceRange: String
            $sizes: [ArtworkSizes]
            $sort: String
            $shouldFetchCounts: Boolean!
            $additionalGeneIDs: [String]
            $artistNationalities: [String]
          ) {
            fair(id: $slug) @principalField {
              ...FairArtworks_fair
                @arguments(
                  acquireable: $acquireable
                  aggregations: $aggregations
                  artistIDs: $artistIDs
                  atAuction: $atAuction
                  attributionClass: $attributionClass
                  colors: $colors
                  forSale: $forSale
                  partnerID: $partnerID
                  includeArtworksByFollowedArtists: $includeArtworksByFollowedArtists
                  inquireableOnly: $inquireableOnly
                  majorPeriods: $majorPeriods
                  medium: $medium
                  offerable: $offerable
                  page: $page
                  priceRange: $priceRange
                  sizes: $sizes
                  sort: $sort
                  shouldFetchCounts: $shouldFetchCounts
                  additionalGeneIDs: $additionalGeneIDs
                  artistNationalities: $artistNationalities
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
        path: "info",
        getComponent: () => FairInfoRoute,
        prepare: () => {
          FairInfoRoute.preload()
        },
        query: graphql`
          query fairRoutes_FairInfoQuery($slug: String!) {
            fair(id: $slug) @principalField {
              ...FairInfo_fair
            }
          }
        `,
      },
      {
        path: "articles",
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

function initializeVariablesWithFilterState(params, props) {
  const initialFilterStateFromUrl = props.location ? props.location.query : {}
  const camelCasedFilterStateFromUrl = paramsToCamelCase(
    initialFilterStateFromUrl
  )

  let aggregations: string[] = ["TOTAL", "MAJOR_PERIOD", "ARTIST"]
  if (props.context.user) aggregations = aggregations.concat("FOLLOWED_ARTISTS")
  const additionalAggregations = getENV("ENABLE_NEW_ARTWORK_FILTERS")
    ? ["PARTNER", "ARTIST_NATIONALITY"]
    : ["GALLERY"]
  const state = {
    sort: "-decayed_merch",
    ...camelCasedFilterStateFromUrl,
    ...params,
    aggregations: aggregations.concat(additionalAggregations),
    shouldFetchCounts: !!props.context.user,
    includeArtworksByFollowedArtists:
      !!props.context.user &&
      camelCasedFilterStateFromUrl["includeArtworksByFollowedArtists"],
  }

  return state
}
