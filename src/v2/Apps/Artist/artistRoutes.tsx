import loadable from "@loadable/component"
import { Redirect, RedirectException, RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"

import { hasSections as showMarketInsights } from "v2/Apps/Artist/Components/MarketInsights/MarketInsights"

import { isDefaultFilter } from "v2/Components/v2/ArtworkFilter/Utils/isDefaultFilter"
import { paramsToCamelCase } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import { getENV } from "v2/Utils/getENV"

import { hasOverviewContent } from "./Components/NavigationTabs"

import {
  ArtworkFilters,
  initialArtworkFilterState,
} from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"

graphql`
  fragment artistRoutes_Artist on Artist {
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

const ArtistApp = loadable(() => import("./ArtistApp"), {
  resolveComponent: component => component.ArtistAppFragmentContainer,
})
const OverviewRoute = loadable(() => import("./Routes/Overview"), {
  resolveComponent: component => component.OverviewRouteFragmentContainer,
})
const WorksForSaleRoute = loadable(() => import("./Routes/Works"), {
  resolveComponent: component => component.WorksRouteFragmentContainer,
})
const AuctionResultsRoute = loadable(() => import("./Routes/AuctionResults"), {
  resolveComponent: component => component.AuctionResultsRouteFragmentContainer,
})
const ConsignRoute = loadable(() => import("./Routes/Consign"), {
  resolveComponent: component => component.ConsignRouteFragmentContainer,
})
const CVRoute = loadable(() => import("./Routes/CV"), {
  resolveComponent: component => component.CVRouteFragmentContainer,
})
const ArticlesRoute = loadable(() => import("./Routes/Articles"), {
  resolveComponent: component => component.ArticlesRouteFragmentContainer,
})
const ShowsRoute = loadable(() => import("./Routes/Shows"), {
  resolveComponent: component => component.ShowsRouteFragmentContainer,
})

// Artist pages tend to load almost instantly, so just preload it up front
if (typeof window !== "undefined") {
  ArtistApp.preload()
  ConsignRoute.preload()
}

export const artistRoutes: RouteConfig[] = [
  {
    children: [
      // Routes in tabs
      {
        displayNavigationTabs: true,
        getComponent: () => OverviewRoute,
        path: "/",
        prepare: () => {
          OverviewRoute.preload()
        },
        query: graphql`
          query artistRoutes_OverviewQuery($artistID: String!)
            @raw_response_type {
            artist(id: $artistID) {
              ...Overview_artist
            }
          }
        `,
      },
      {
        displayNavigationTabs: true,
        getComponent: () => WorksForSaleRoute,
        ignoreScrollBehavior: true,
        path: "works-for-sale",
        prepare: () => {
          WorksForSaleRoute.preload()
        },
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

          const aggregations = ["MEDIUM", "TOTAL", "MAJOR_PERIOD"]
          const additionalAggregations = getENV("ENABLE_NEW_ARTWORK_FILTERS")
            ? ["PARTNER"]
            : ["GALLERY", "INSTITUTION"]

          return {
            ...filterParams,
            aggregations: aggregations.concat(additionalAggregations),
          }
        },
        query: graphql`
          query artistRoutes_WorksQuery(
            $acquireable: Boolean
            $aggregations: [ArtworkAggregation]
            $artistID: String!
            $atAuction: Boolean
            $attributionClass: [String]
            $colors: [String]
            $forSale: Boolean
            $height: String
            $inquireableOnly: Boolean
            $keyword: String
            $majorPeriods: [String]
            $medium: String
            $offerable: Boolean
            $page: Int
            $partnerID: ID
            $partnerIDs: [String]
            $priceRange: String
            $sizes: [ArtworkSizes]
            $sort: String
            $width: String
          ) @raw_response_type {
            artist(id: $artistID) {
              ...Works_artist
                @arguments(
                  acquireable: $acquireable
                  aggregations: $aggregations
                  artistID: $artistID
                  atAuction: $atAuction
                  attributionClass: $attributionClass
                  colors: $colors
                  forSale: $forSale
                  height: $height
                  inquireableOnly: $inquireableOnly
                  keyword: $keyword
                  majorPeriods: $majorPeriods
                  medium: $medium
                  offerable: $offerable
                  page: $page
                  partnerID: $partnerID
                  partnerIDs: $partnerIDs
                  priceRange: $priceRange
                  sizes: $sizes
                  sort: $sort
                  width: $width
                )
            }
          }
        `,
      },
      {
        displayNavigationTabs: true,
        getComponent: () => AuctionResultsRoute,
        ignoreScrollBehavior: false,
        path: "auction-results",
        prepare: () => {
          AuctionResultsRoute.preload()
        },
        query: graphql`
          query artistRoutes_AuctionResultsQuery($artistID: String!) {
            artist(id: $artistID) {
              ...AuctionResults_artist
            }
          }
        `,
      },

      // Routes not in tabs

      {
        displayFullPage: true,
        getComponent: () => ConsignRoute,
        path: "consign",
        prepare: () => {
          ConsignRoute.preload()
        },
        query: graphql`
          query artistRoutes_ArtistConsignQuery($artistID: String!) {
            artist(id: $artistID) {
              ...Consign_artist

              targetSupply {
                isInMicrofunnel
              }
            }
          }
        `,
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
      },
      {
        getComponent: () => CVRoute,
        path: "cv",
        prepare: () => {
          CVRoute.preload()
        },
        query: graphql`
          query artistRoutes_CVQuery($artistID: String!) {
            viewer {
              ...CV_viewer
            }
          }
        `,
      },
      {
        getComponent: () => ArticlesRoute,
        path: "articles",
        prepare: () => {
          ArticlesRoute.preload()
        },
        query: graphql`
          query artistRoutes_ArticlesQuery($artistID: String!) {
            artist(id: $artistID) {
              ...Articles_artist
            }
          }
        `,
      },
      {
        getComponent: () => ShowsRoute,
        path: "shows",
        prepare: () => {
          ShowsRoute.preload()
        },
        query: graphql`
          query artistRoutes_ShowsQuery($artistID: String!) {
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
    getComponent: () => ArtistApp,
    path: "/artist/:artistID",
    prepare: () => {
      ArtistApp.preload()
    },
    query: graphql`
      query artistRoutes_ArtistTopLevelQuery($artistID: String!)
        @raw_response_type {
        artist(id: $artistID) @principalField {
          ...ArtistApp_artist
          ...artistRoutes_Artist @relay(mask: false)
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
        throw new RedirectException(`/artist/${artist.slug}`, 301)
      }

      if (!canShowOverview && !alreadyAtWorksForSalePath) {
        throw new RedirectException(
          `/artist/${artist.slug}/works-for-sale`,
          301
        )
      }

      return <Component {...props} />
    },
  },
]
