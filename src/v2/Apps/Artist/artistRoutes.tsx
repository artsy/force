import React from "react"
import loadable from "@loadable/component"
import { Redirect, RedirectException } from "found"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"
import { renderOrRedirect } from "./Routes/Overview/Utils/renderOrRedirect"
import { getWorksForSaleRouteVariables } from "./Routes/WorksForSale/Utils/getWorksForSaleRouteVariables"
import { paramsToCamelCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { initialAuctionResultsFilterState } from "./Routes/AuctionResults/AuctionResultsFilterContext"
import { allowedAuctionResultFilters } from "./Utils/allowedAuctionResultFilters"

const ArtistApp = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./ArtistApp"),
  {
    resolveComponent: component => component.ArtistAppFragmentContainer,
  }
)
const OverviewRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/Overview/ArtistOverviewRoute"
    ),
  {
    resolveComponent: component =>
      component.ArtistOverviewRouteFragmentContainer,
  }
)
const WorksForSaleRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/WorksForSale/ArtistWorksForSaleRoute"
    ),
  {
    resolveComponent: component =>
      component.ArtistWorksForSaleRouteFragmentContainer,
  }
)
const CVRoute = loadable(
  () =>
    import(/* webpackChunkName: "artistBundle" */ "./Routes/CV/ArtistCVRoute"),
  {
    resolveComponent: component => component.ArtistCVRouteFragmentContainer,
  }
)
const ArticlesRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/Articles/ArtistArticlesRoute"
    ),
  {
    resolveComponent: component =>
      component.ArtistArticlesRouteFragmentContainer,
  }
)
const ShowsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/Shows/ArtistShowsRoute"
    ),
  {
    resolveComponent: component => component.ArtistShowsRouteFragmentContainer,
  }
)
const AuctionResultsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/AuctionResults/ArtistAuctionResultsRoute"
    ),
  {
    resolveComponent: component =>
      component.AuctionResultsRouteFragmentContainer,
  }
)
const ConsignRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/Consign/ArtistConsignRoute"
    ),
  {
    resolveComponent: component =>
      component.ArtistConsignRouteFragmentContainer,
  }
)

export const artistRoutes: AppRouteConfig[] = [
  {
    path: "/artist/:artistID",
    theme: "v3",
    ignoreScrollBehaviorBetweenChildren: true,
    getComponent: () => ArtistApp,
    prepare: () => {
      ArtistApp.preload()
      OverviewRoute.preload()
      WorksForSaleRoute.preload()
    },
    query: graphql`
      query artistRoutes_TopLevelQuery($artistID: String!) {
        artist(id: $artistID) @principalField {
          ...ArtistApp_artist
          ...ArtistApp_sharedMetadata @relay(mask: false) # used to determine redirects and renderability
        }
      }
    `,
    render: renderOrRedirect,
    children: [
      {
        path: "/",
        theme: "v3",
        getComponent: () => OverviewRoute,
        prepare: () => {
          OverviewRoute.preload()
        },
        query: graphql`
          query artistRoutes_OverviewQuery($artistID: String!) {
            artist(id: $artistID) {
              ...ArtistOverviewRoute_artist
            }
          }
        `,
      },
      {
        path: "works-for-sale",
        theme: "v3",
        getComponent: () => WorksForSaleRoute,
        prepare: () => {
          WorksForSaleRoute.preload()
        },
        prepareVariables: getWorksForSaleRouteVariables,
        query: graphql`
          query artistRoutes_WorksForSaleQuery(
            $artistID: String!
            $input: FilterArtworksInput
            $aggregations: [ArtworkAggregation]
          ) {
            artist(id: $artistID) {
              ...ArtistWorksForSaleRoute_artist
                @arguments(input: $input, aggregations: $aggregations)
            }
          }
        `,
      },
      {
        path: "auction-results",
        theme: "v3",
        getComponent: () => AuctionResultsRoute,
        prepare: () => {
          AuctionResultsRoute.preload()
        },
        prepareVariables: ({ artistID }, props) => {
          const urlFilterState = paramsToCamelCase(
            props.location ? props.location.query : {}
          )

          return {
            artistID,
            ...initialAuctionResultsFilterState({
              startDate: 0,
              endDate: 0,
            }),
            ...allowedAuctionResultFilters(urlFilterState),
          }
        },
        query: graphql`
          query artistRoutes_AuctionResultsQuery(
            $artistID: String!
            $organizations: [String]
            $categories: [String]
            $sizes: [ArtworkSizes]
            $createdAfterYear: Int
            $createdBeforeYear: Int
            $allowEmptyCreatedDates: Boolean
          ) {
            artist(id: $artistID) {
              ...ArtistAuctionResultsRoute_artist
                @arguments(
                  organizations: $organizations
                  categories: $categories
                  sizes: $sizes
                  createdAfterYear: $createdAfterYear
                  createdBeforeYear: $createdBeforeYear
                  allowEmptyCreatedDates: $allowEmptyCreatedDates
                )
            }
          }
        `,
      },

      // Routes not in tabs

      {
        path: "articles",
        theme: "v3",
        hideNavigationTabs: true,
        getComponent: () => ArticlesRoute,
        prepare: () => {
          ArticlesRoute.preload()
        },
        query: graphql`
          query artistRoutes_ArticlesQuery($artistID: String!) {
            artist(id: $artistID) {
              ...ArtistArticlesRoute_artist
            }
          }
        `,
      },
      {
        path: "consign",
        theme: "v2",
        displayFullPage: true,
        hideNavigationTabs: true,
        getComponent: () => ConsignRoute,
        prepare: () => {
          ConsignRoute.preload()
        },
        query: graphql`
          query artistRoutes_ArtistConsignQuery($artistID: String!) {
            artist(id: $artistID) {
              ...ArtistConsignRoute_artist

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
        path: "cv",
        theme: "v3",
        hideNavigationTabs: true,
        getComponent: () => CVRoute,
        prepare: () => {
          CVRoute.preload()
        },
        query: graphql`
          query artistRoutes_CVQuery($artistID: String!) {
            viewer {
              ...ArtistCVRoute_viewer
            }
          }
        `,
      },
      {
        path: "shows",
        theme: "v3",
        hideNavigationTabs: true,
        getComponent: () => ShowsRoute,
        prepare: () => {
          ShowsRoute.preload()
        },
        query: graphql`
          query artistRoutes_ShowsQuery($artistID: String!) {
            viewer {
              ...ArtistShowsRoute_viewer
            }
          }
        `,
      },

      /**
       * Redirect all unhandled tabs to the artist page.
       *
       * Note: there is a deep-linked standalone auction-lot page in Force,
       * under /artist/:artistID/auction-result/:id. That app needs to be
       * mounted before this app for that to work and not get caught here.
       */
      new Redirect({
        from: "*",
        to: "/artist/:artistID",
      }) as any,
    ],
  },
]
