import loadable from "@loadable/component"
import { initialAuctionResultsFilterState } from "Apps/Artist/Routes/AuctionResults/initialAuctionResultsFilterState"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import type { RouteProps } from "System/Router/Route"
import { RedirectException } from "found"
import { graphql } from "react-relay"
import { getWorksForSaleRouteVariables } from "./Routes/WorksForSale/Utils/getWorksForSaleRouteVariables"
import { enableArtistPageCTA } from "./Server/enableArtistPageCTA"
import { redirectWithCanonicalParams } from "./Server/redirect"
import { allowedAuctionResultFilters } from "./Utils/allowedAuctionResultFilters"

// A/B Test: diamond_artist-combined-layout
// When enabled, renders the combined layout for all artist page routes
const COMBINED_LAYOUT_FLAG = "diamond_artist-combined-layout"

const ArtistApp = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./ArtistApp"),
  { resolveComponent: component => component.ArtistAppFragmentContainer },
)

const ArtistSubApp = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./ArtistSubApp"),
  { resolveComponent: component => component.ArtistSubAppFragmentContainer },
)

const OverviewRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/Overview/ArtistOverviewRoute"
    ),
  {
    resolveComponent: component =>
      component.ArtistOverviewRouteFragmentContainer,
  },
)

const CombinedRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/Combined/ArtistCombinedRoute"
    ),
  {
    resolveComponent: component =>
      component.ArtistCombinedRouteFragmentContainer,
  },
)

const WorksForSaleRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/WorksForSale/ArtistWorksForSaleRoute"
    ),
  {
    resolveComponent: component =>
      component.ArtistWorksForSaleRouteFragmentContainer,
  },
)

const CVRoute = loadable(
  () =>
    import(/* webpackChunkName: "artistBundle" */ "./Routes/CV/ArtistCVRoute"),
  { resolveComponent: component => component.ArtistCVRouteFragmentContainer },
)

const ArticlesRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/Articles/ArtistArticlesRoute"
    ),
  {
    resolveComponent: component =>
      component.ArtistArticlesRouteFragmentContainer,
  },
)

const ArtistSeriesRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/ArtistSeries/ArtistArtistSeriesRoute"
    ),
  {
    resolveComponent: component =>
      component.ArtistArtistSeriesRouteFragmentContainer,
  },
)

const ShowsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/Shows/ArtistShowsRoute"
    ),
  {
    resolveComponent: component => component.ArtistShowsRouteFragmentContainer,
  },
)

const AuctionResultsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/AuctionResults/ArtistAuctionResultsRoute"
    ),
  {
    resolveComponent: component =>
      component.AuctionResultsRouteFragmentContainer,
  },
)

const AuctionResultRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/AuctionResults/SingleAuctionResultPage/AuctionResult"
    ),
  { resolveComponent: component => component.AuctionResultFragmentContainer },
)

export const artistRoutes: RouteProps[] = [
  {
    path: "/artist/:artistID",
    ignoreScrollBehaviorBetweenChildren: true,
    getComponent: () => ArtistApp,
    onServerSideRender: enableArtistPageCTA,
    onPreloadJS: () => {
      ArtistApp.preload()
      OverviewRoute.preload()
      WorksForSaleRoute.preload()
    },
    query: graphql`
      query artistRoutes_ArtistAppQuery($artistID: String!) @cacheable {
        artist(id: $artistID) @principalField {
          ...ArtistApp_artist
        }
      }
    `,
    children: [
      {
        path: "combined",
        getComponent: () => CombinedRoute,
        onPreloadJS: () => {
          CombinedRoute.preload()
        },
        query: graphql`
          query artistRoutes_CombinedQuery($artistID: String!) @cacheable {
            artist(id: $artistID) @principalField {
              ...ArtistCombinedRoute_artist
            }
          }
        `,
      },
      {
        path: "",
        getComponent: match => {
          const context = match.context
          const isExperiment =
            context.featureFlags.isEnabled(COMBINED_LAYOUT_FLAG)
          return isExperiment ? CombinedRoute : WorksForSaleRoute
        },
        onServerSideRender: redirectWithCanonicalParams,
        onPreloadJS: () => {
          WorksForSaleRoute.preload()
          CombinedRoute.preload()
        },
        prepareVariables: (params, props) => {
          const isExperiment =
            props.context.featureFlags.isEnabled(COMBINED_LAYOUT_FLAG)

          const worksForSaleVariables = getWorksForSaleRouteVariables(
            params,
            props,
          )

          return {
            ...worksForSaleVariables,
            includeCombinedFragment: isExperiment,
          }
        },
        query: graphql`
          query artistRoutes_WorksForSaleQuery(
            $artistID: String!
            $includeCombinedFragment: Boolean = false
          ) @cacheable {
            artist(id: $artistID) @principalField {
              ...ArtistWorksForSaleRoute_artist
              ...ArtistCombinedRoute_artist
                @include(if: $includeCombinedFragment)
            }
          }
        `,
      },
      {
        path: "auction-results",
        getComponent: ({ context }) => {
          const isExperiment =
            context.featureFlags.isEnabled(COMBINED_LAYOUT_FLAG)
          return isExperiment ? CombinedRoute : AuctionResultsRoute
        },
        onPreloadJS: () => {
          AuctionResultsRoute.preload()
          CombinedRoute.preload()
        },
        prepareVariables: ({ artistID }, props) => {
          const isExperiment =
            props.context.featureFlags.isEnabled(COMBINED_LAYOUT_FLAG)
          const urlFilterState = paramsToCamelCase(
            props.location ? props.location.query : {},
          )

          const initialInput = {
            ...initialAuctionResultsFilterState({}),
            ...allowedAuctionResultFilters(urlFilterState),
          }

          return {
            artistID,
            ...initialInput,
            state: initialInput?.hideUpcoming ? "PAST" : "ALL",
            includeCombinedFragment: isExperiment,
          }
        },
        query: graphql`
          query artistRoutes_AuctionResultsQuery(
            $page: Int
            $state: AuctionResultsState
            $artistID: String!
            $organizations: [String]
            $categories: [String]
            $sizes: [ArtworkSizes]
            $priceRange: String
            $includeEstimateRange: Boolean
            $includeUnknownPrices: Boolean
            $createdAfterYear: Int
            $createdBeforeYear: Int
            $allowEmptyCreatedDates: Boolean
            $includeCombinedFragment: Boolean = false
          ) @cacheable {
            artist(id: $artistID) @principalField {
              ...ArtistAuctionResultsRoute_artist
                @arguments(
                  page: $page
                  state: $state
                  organizations: $organizations
                  categories: $categories
                  sizes: $sizes
                  priceRange: $priceRange
                  includeEstimateRange: $includeEstimateRange
                  includeUnknownPrices: $includeUnknownPrices
                  createdAfterYear: $createdAfterYear
                  createdBeforeYear: $createdBeforeYear
                  allowEmptyCreatedDates: $allowEmptyCreatedDates
                )
              ...ArtistCombinedRoute_artist
                @include(if: $includeCombinedFragment)
            }
          }
        `,
      },
      {
        path: "about",
        getComponent: ({ context }) => {
          const isExperiment =
            context.featureFlags.isEnabled(COMBINED_LAYOUT_FLAG)
          return isExperiment ? CombinedRoute : OverviewRoute
        },
        onServerSideRender: enableArtistPageCTA,
        onPreloadJS: () => {
          OverviewRoute.preload()
          CombinedRoute.preload()
        },
        prepareVariables: ({ artistID }, props) => {
          const isExperiment =
            props.context.featureFlags.isEnabled(COMBINED_LAYOUT_FLAG)
          return {
            artistID,
            includeCombinedFragment: isExperiment,
          }
        },
        query: graphql`
          query artistRoutes_OverviewQuery(
            $artistID: String!
            $includeCombinedFragment: Boolean = false
          ) @cacheable {
            artist(id: $artistID) @principalField {
              ...ArtistOverviewRoute_artist
              ...ArtistCombinedRoute_artist
                @include(if: $includeCombinedFragment)
            }
          }
        `,
      },
    ],
  },
  {
    path: "/artist/:artistID",
    ignoreScrollBehaviorBetweenChildren: true,
    getComponent: () => ArtistSubApp,
    query: graphql`
      query artistRoutes_ArtistSubAppQuery($artistID: String!) @cacheable {
        artist(id: $artistID) @principalField {
          ...ArtistSubApp_artist
        }
      }
    `,
    children: [
      {
        path: "articles/:artworkId?",
        getComponent: () => ArticlesRoute,
        onPreloadJS: () => {
          ArticlesRoute.preload()
        },
        query: graphql`
          query artistRoutes_ArticlesQuery($artistID: String!) @cacheable {
            artist(id: $artistID) @principalField {
              ...ArtistArticlesRoute_artist
            }
          }
        `,
      },
      {
        path: "cv",
        getComponent: () => CVRoute,
        onPreloadJS: () => {
          CVRoute.preload()
        },
        query: graphql`
          query artistRoutes_CVQuery($artistID: String!) @cacheable {
            viewer {
              ...ArtistCVRoute_viewer
            }
          }
        `,
      },
      {
        path: "series",
        getComponent: () => ArtistSeriesRoute,
        onPreloadJS: () => {
          ArtistSeriesRoute.preload()
        },
        query: graphql`
          query artistRoutes_ArtistSeriesQuery($artistID: String!) @cacheable {
            artist(id: $artistID) @principalField {
              ...ArtistArtistSeriesRoute_artist
            }
          }
        `,
      },
      {
        path: "shows",
        getComponent: () => ShowsRoute,
        onPreloadJS: () => {
          ShowsRoute.preload()
        },
        query: graphql`
          query artistRoutes_ShowsQuery($artistID: String!) @cacheable {
            viewer {
              ...ArtistShowsRoute_viewer
            }
          }
        `,
      },
      {
        // Redirect all unhandled tabs to the artist page.
        path: ":tab?",
        render: ({ match }) => {
          throw new RedirectException(
            `/artist/${match.params.artistID}${match.location.search}`,
            301,
          )
        },
      },
    ],
  },
  {
    path: "/auction-result/:auctionResultId",
    getComponent: () => AuctionResultRoute,
    onServerSideRender: enableArtistPageCTA,
    onPreloadJS: () => {
      AuctionResultRoute.preload()
    },
    query: graphql`
      query artistRoutes_AuctionResultQuery($auctionResultId: String!)
      @cacheable {
        auctionResult(id: $auctionResultId) @principalField {
          ...AuctionResult_auctionResult
        }
      }
    `,
  },
]
