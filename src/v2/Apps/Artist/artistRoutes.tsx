import loadable from "@loadable/component"
import { Redirect, RedirectException } from "found"
import React from "react"
import { graphql } from "react-relay"

import { hasSections as showMarketInsights } from "v2/Apps/Artist/Components/MarketInsights/MarketInsights"

import { paramsToCamelCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { getENV } from "v2/Utils/getENV"

import { hasOverviewContent } from "./Components/NavigationTabs"

import { initialArtworkFilterState } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { allowedFilters } from "v2/Components/ArtworkFilter/Utils/allowedFilters"
import { AppRouteConfig } from "v2/Artsy/Router/Route"

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

const ArtistApp = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./ArtistApp"),
  {
    resolveComponent: component => component.ArtistAppFragmentContainer,
  }
)
const OverviewRoute = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./Routes/Overview"),
  {
    resolveComponent: component => component.OverviewRouteFragmentContainer,
  }
)
const WorksForSaleRoute = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./Routes/Works"),
  {
    resolveComponent: component => component.WorksRouteFragmentContainer,
  }
)
const AuctionResultsRoute = loadable(
  () =>
    import(/* webpackChunkName: "artistBundle" */ "./Routes/AuctionResults"),
  {
    resolveComponent: component =>
      component.AuctionResultsRouteFragmentContainer,
  }
)
const ConsignRoute = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./Routes/Consign"),
  {
    resolveComponent: component => component.ConsignRouteFragmentContainer,
  }
)
const CVRoute = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./Routes/CV"),
  {
    resolveComponent: component => component.CVRouteFragmentContainer,
  }
)
const ArticlesRoute = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./Routes/Articles"),
  {
    resolveComponent: component => component.ArticlesRouteFragmentContainer,
  }
)
const ShowsRoute = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./Routes/Shows"),
  {
    resolveComponent: component => component.ShowsRouteFragmentContainer,
  }
)

// Artist pages tend to load almost instantly, so just preload it up front
if (typeof window !== "undefined") {
  ArtistApp.preload()
  ConsignRoute.preload()
}

export const artistRoutes: AppRouteConfig[] = [
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
        prepareVariables: ({ artistID }, props) => {
          // FIXME: The initial render includes `location` in props, but subsequent
          // renders (such as tabbing back to this route in your browser) will not.
          const filterStateFromUrl = props.location ? props.location.query : {}

          const sort =
            getENV("DECAYED_MERCH_V3") === "experiment"
              ? "-decayed_merch_v2"
              : "-decayed_merch"

          const filterParams = {
            ...initialArtworkFilterState,
            ...paramsToCamelCase(filterStateFromUrl),
            sort,
          }

          // filterParams.hasFilter = Object.entries(filterParams).some(
          //   ([k, v]: [keyof ArtworkFilters, any]) => {
          //     return !isDefaultFilter(k, v)
          //   }
          // )

          const aggregations = ["MEDIUM", "TOTAL", "MAJOR_PERIOD"]
          const additionalAggregations = getENV("ENABLE_NEW_ARTWORK_FILTERS")
            ? ["PARTNER", "LOCATION_CITY", "MATERIALS_TERMS"]
            : ["GALLERY", "INSTITUTION"]
          const allAggregations = aggregations.concat(additionalAggregations)

          return {
            input: {
              ...allowedFilters(filterParams),
            },
            aggregations: allAggregations,
            artistID,
          }
        },
        query: graphql`
          query artistRoutes_WorksQuery(
            $artistID: String!
            $input: FilterArtworksInput
            $aggregations: [ArtworkAggregation]
          ) @raw_response_type {
            artist(id: $artistID) {
              ...Works_artist
                @arguments(input: $input, aggregations: $aggregations)
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
