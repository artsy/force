import loadable from "@loadable/component"
import { Redirect, RedirectException, RouteConfig } from "found"
import * as React from "react"
import { graphql } from "react-relay"

import { hasSections as showMarketInsights } from "v2/Apps/Artist/Components/MarketInsights/MarketInsights"

import { isDefaultFilter } from "v2/Components/v2/ArtworkFilter/Utils/isDefaultFilter"
import { paramsToCamelCase } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"

import { hasOverviewContent } from "./Components/NavigationTabs"

import {
  ArtworkFilters,
  initialArtworkFilterState,
} from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { userHasLabFeature } from "v2/Utils/user"

graphql`
  fragment routes_Artist on Artist {
    slug
    statuses {
      shows
      cv(minShowCount: 0)
      articles
    }
    counts {
      forSaleArtworks
    }
    related {
      genes {
        edges {
          node {
            slug
          }
        }
      }
    }
    highlights {
      partnersConnection(
        first: 10
        displayOnPartnerProfile: true
        representedBy: true
        partnerCategory: ["blue-chip", "top-established", "top-emerging"]
      ) {
        edges {
          node {
            categories {
              slug
            }
          }
        }
      }
    }
    insights {
      type
    }
    biographyBlurb(format: HTML, partnerBio: true) {
      text
    }
  }
`

const ArtistApp = loadable(() => import("./ArtistApp"))
const OverviewRoute = loadable(() => import("./Routes/Overview"))
const WorksForSaleRoute = loadable(() => import("./Routes/Works"))
const AuctionResultsRoute = loadable(() => import("./Routes/AuctionResults"))
const ConsignRoute = loadable(() => import("./Routes/Consign"))
const CVRoute = loadable(() => import("./Routes/CV"))
const ArticlesRoute = loadable(() => import("./Routes/Articles"))
const ShowsRoute = loadable(() => import("./Routes/Shows"))

// Artist pages tend to load almost instantly, so just preload it up front
if (typeof window !== "undefined") {
  ArtistApp.preload()
  ConsignRoute.preload()
}

// FIXME:
// * `render` functions requires casting
// * `Redirect` needs to be casted, as it’s not compatible with `RouteConfig`
export const routes: RouteConfig[] = [
  {
    path: "/artist/:artistID",
    getComponent: () => ArtistApp,
    prepare: () => {
      ArtistApp.preload()
    },
    query: graphql`
      query routes_ArtistTopLevelQuery($artistID: String!) @raw_response_type {
        artist(id: $artistID) @principalField {
          ...ArtistApp_artist
          ...routes_Artist @relay(mask: false)
        }
      }
    `,
    render: ({ Component, props, match }) => {
      if (!(Component && props)) {
        return null
      }

      const { artist } = props as any
      const { pathname } = match.location

      if (!artist) {
        return undefined
      }

      const showArtistInsights =
        showMarketInsights(artist) ||
        (artist.insights && artist.insights.length > 0)
      const hasArtistContent = hasOverviewContent(artist)

      const alreadyAtWorksForSalePath = pathname.includes(
        `${artist.slug}/works-for-sale`
      )

      const canShowOverview = showArtistInsights || hasArtistContent

      if (pathname === `/artist/${artist.slug}/`) {
        throw new RedirectException(`/artist/${artist.slug}`)
      }

      if (!canShowOverview && !alreadyAtWorksForSalePath) {
        throw new RedirectException(`/artist/${artist.slug}/works-for-sale`)
      }

      return <Component {...props} />
    },
    children: [
      // Routes in tabs
      {
        path: "/",
        getComponent: () => OverviewRoute,
        prepare: () => {
          OverviewRoute.preload()
        },
        displayNavigationTabs: true,
        query: graphql`
          query routes_OverviewQuery($artistID: String!) @raw_response_type {
            artist(id: $artistID) {
              ...Overview_artist
            }
          }
        `,
      },
      {
        path: "works-for-sale",
        getComponent: () => WorksForSaleRoute,
        prepare: () => {
          WorksForSaleRoute.preload()
        },
        displayNavigationTabs: true,
        ignoreScrollBehavior: true,
        query: graphql`
          query routes_WorksQuery(
            $acquireable: Boolean
            $aggregations: [ArtworkAggregation] = [
              MEDIUM
              TOTAL
              GALLERY
              INSTITUTION
              MAJOR_PERIOD
            ]
            $artistID: String!
            $atAuction: Boolean
            $attributionClass: [String]
            $color: String
            $forSale: Boolean
            $height: String
            $inquireableOnly: Boolean
            $keyword: String
            $majorPeriods: [String]
            $medium: String
            $offerable: Boolean
            $page: Int
            $partnerID: ID
            $priceRange: String
            $sizes: [ArtworkSizes]
            $sort: String
            $width: String
            $shouldFetchArtistSeriesData: Boolean!
          ) @raw_response_type {
            artist(id: $artistID) {
              ...Works_artist
                @arguments(
                  acquireable: $acquireable
                  aggregations: $aggregations
                  artistID: $artistID
                  atAuction: $atAuction
                  attributionClass: $attributionClass
                  color: $color
                  forSale: $forSale
                  height: $height
                  inquireableOnly: $inquireableOnly
                  keyword: $keyword
                  majorPeriods: $majorPeriods
                  medium: $medium
                  offerable: $offerable
                  page: $page
                  partnerID: $partnerID
                  priceRange: $priceRange
                  sizes: $sizes
                  sort: $sort
                  width: $width
                  shouldFetchArtistSeriesData: $shouldFetchArtistSeriesData
                )
            }
          }
        `,
        prepareVariables: (params, props) => {
          // FIXME: The initial render includes `location` in props, but subsequent
          // renders (such as tabbing back to this route in your browser) will not.
          const filterStateFromUrl = props.location ? props.location.query : {}

          const filterParams = {
            ...initialArtworkFilterState,
            ...paramsToCamelCase(filterStateFromUrl),
            ...params,
          }

          filterParams.hasFilter = Object.entries(filterParams).some(
            ([k, v]: [keyof ArtworkFilters, any]) => {
              return !isDefaultFilter(k, v)
            }
          )

          const user = props.context.user
          filterParams.shouldFetchArtistSeriesData = userHasLabFeature(
            user,
            "Artist Series"
          )

          return filterParams
        },
      },
      {
        path: "auction-results",
        getComponent: () => AuctionResultsRoute,
        prepare: () => {
          AuctionResultsRoute.preload()
        },
        displayNavigationTabs: true,
        ignoreScrollBehavior: true,
        query: graphql`
          query routes_AuctionResultsQuery($artistID: String!) {
            artist(id: $artistID) {
              ...AuctionResults_artist
            }
          }
        `,
      },

      // Routes not in tabs

      {
        path: "consign",
        getComponent: () => ConsignRoute,
        prepare: () => {
          ConsignRoute.preload()
        },
        displayFullPage: true,
        render: ({ Component, props, match }) => {
          if (!(Component && props)) {
            return undefined
          }

          const artistPathName = match.location.pathname.replace("/consign", "")
          const isInMicrofunnel = (props as any).artist.targetSupply
            .isInMicrofunnel

          if (isInMicrofunnel) {
            return <Component {...props} />
          } else {
            throw new RedirectException(artistPathName)
          }
        },
        query: graphql`
          query routes_ArtistConsignQuery($artistID: String!) {
            artist(id: $artistID) {
              ...Consign_artist

              targetSupply {
                isInMicrofunnel
              }
            }
          }
        `,
      },
      {
        path: "cv",
        getComponent: () => CVRoute,
        prepare: () => {
          CVRoute.preload()
        },
        query: graphql`
          query routes_CVQuery($artistID: String!) {
            viewer {
              ...CV_viewer
            }
          }
        `,
      },
      {
        path: "articles",
        getComponent: () => ArticlesRoute,
        prepare: () => {
          ArticlesRoute.preload()
        },
        query: graphql`
          query routes_ArticlesQuery($artistID: String!) {
            artist(id: $artistID) {
              ...Articles_artist
            }
          }
        `,
      },
      {
        path: "shows",
        getComponent: () => ShowsRoute,
        prepare: () => {
          ShowsRoute.preload()
        },
        query: graphql`
          query routes_ShowsQuery($artistID: String!) {
            viewer {
              ...Shows_viewer
            }
          }
        `,
      },

      // Redirect all unhandled tabs to the artist page.
      // Note: there is a deep-linked standalone auction-lot page
      // in Force, under /artist/:artistID/auction-result/:id.
      // That app needs to be mounted before this app for that to work,
      // and not get caught here.
      new Redirect({
        from: "*",
        to: "/artist/:artistID",
      }) as any,
    ],
  },
]
