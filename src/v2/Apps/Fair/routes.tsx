import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"
import { paramsToCamelCase } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"

const FairApp = loadable(() => import("./FairApp"))
const FairSubApp = loadable(() => import("./FairSubApp"))
const FairExhibitorsRoute = loadable(() => import("./Routes/FairExhibitors"))
const FairArtworksRoute = loadable(() => import("./Routes/FairArtworks"))
const FairInfoRoute = loadable(() => import("./Routes/FairInfo"))

export const routes: RouteConfig[] = [
  {
    path: "/fair2/:slug",
    ignoreScrollBehavior: true,
    getComponent: () => FairApp,
    prepare: () => {
      FairApp.preload()
    },
    query: graphql`
      query routes_FairQuery($slug: String!) {
        fair(id: $slug) {
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
          query routes_FairExhibitorsQuery($slug: String!) {
            fair(id: $slug) {
              ...FairExhibitors_fair
            }
          }
        `,
      },
      {
        path: "artworks",
        getComponent: () => FairArtworksRoute,
        prepare: () => {
          FairArtworksRoute.preload()
        },
        prepareVariables: initializeVariablesWithFilterState,
        query: graphql`
          query routes_FairArtworksQuery(
            $slug: String!
            $acquireable: Boolean
            $aggregations: [ArtworkAggregation] = [TOTAL, GALLERY, MAJOR_PERIOD]
            $atAuction: Boolean
            $color: String
            $forSale: Boolean
            $inquireableOnly: Boolean
            $majorPeriods: [String]
            $medium: String
            $offerable: Boolean
            $page: Int
            $partnerID: ID
            $priceRange: String
            $sizes: [ArtworkSizes]
            $sort: String
          ) {
            fair(id: $slug) {
              ...FairArtworks_fair
                @arguments(
                  acquireable: $acquireable
                  aggregations: $aggregations
                  atAuction: $atAuction
                  color: $color
                  forSale: $forSale
                  partnerID: $partnerID
                  inquireableOnly: $inquireableOnly
                  majorPeriods: $majorPeriods
                  medium: $medium
                  offerable: $offerable
                  page: $page
                  priceRange: $priceRange
                  sizes: $sizes
                  sort: $sort
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
    path: "/fair2/:slug",
    getComponent: () => FairSubApp,
    prepare: () => {
      FairSubApp.preload()
    },
    query: graphql`
      query routes_FairSubAppQuery($slug: String!) {
        fair(id: $slug) {
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
          query routes_FairInfoQuery($slug: String!) {
            fair(id: $slug) {
              ...FairInfo_fair
            }
          }
        `,
      },
    ],
  },
]

function initializeVariablesWithFilterState(params, props) {
  const initialFilterState = props.location ? props.location.query : {}

  const state = {
    sort: "-decayed_merch",
    ...paramsToCamelCase(initialFilterState),
    ...params,
  }

  return state
}
