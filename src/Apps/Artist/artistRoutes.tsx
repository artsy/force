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

const ArtistABTestRoute = loadable(
  () =>
    import(/* webpackChunkName: "artistBundle" */ "./Routes/ArtistABTestRoute"),
  {
    resolveComponent: component => component.ArtistABTestRouteFragmentContainer,
  },
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
        path: "ab",
        getComponent: () => ArtistABTestRoute,
        onServerSideRender: redirectWithCanonicalParams,
        onPreloadJS: () => {
          ArtistABTestRoute.preload()
        },
        prepareVariables: getWorksForSaleRouteVariables,
        query: graphql`
          query artistRoutes_ArtistABTestQuery($artistID: String!) @cacheable {
            artist(id: $artistID) @principalField {
              ...ArtistABTestRoute_artist
            }
          }
        `,
        children: [
          {
            path: "combined",
            getComponent: () => ArtistABTestRoute,
            onPreloadJS: () => {
              ArtistABTestRoute.preload()
            },
          },
          {
            path: "auction-results",
            getComponent: () => ArtistABTestRoute,
            onPreloadJS: () => {
              ArtistABTestRoute.preload()
            },
            query: graphql`
              query artistRoutes_ArtistABTestAuctionResultsQuery(
                $artistID: String!
              ) @cacheable {
                artist(id: $artistID) @principalField {
                  ...ArtistABTestRoute_artist
                }
              }
            `,
          },
          {
            path: "about",
            getComponent: () => ArtistABTestRoute,
            onServerSideRender: enableArtistPageCTA,
            onPreloadJS: () => {
              ArtistABTestRoute.preload()
            },
            query: graphql`
              query artistRoutes_ArtistABTestAboutQuery($artistID: String!)
              @cacheable {
                artist(id: $artistID) @principalField {
                  ...ArtistABTestRoute_artist
                }
              }
            `,
          },
        ],
      },
      {
        path: "",
        getComponent: () => WorksForSaleRoute,
        onServerSideRender: redirectWithCanonicalParams,
        onPreloadJS: () => {
          WorksForSaleRoute.preload()
        },
        prepareVariables: getWorksForSaleRouteVariables,
        query: graphql`
          query artistRoutes_WorksForSaleQuery($artistID: String!) @cacheable {
            artist(id: $artistID) @principalField {
              ...ArtistWorksForSaleRoute_artist
            }
          }
        `,
      },
      {
        path: "auction-results",
        getComponent: () => AuctionResultsRoute,
        onPreloadJS: () => {
          AuctionResultsRoute.preload()
        },
        prepareVariables: ({ artistID }, props) => {
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
            }
          }
        `,
      },
      {
        path: "about",
        getComponent: () => OverviewRoute,
        onServerSideRender: enableArtistPageCTA,
        onPreloadJS: () => {
          OverviewRoute.preload()
        },
        query: graphql`
          query artistRoutes_OverviewQuery($artistID: String!) @cacheable {
            artist(id: $artistID) @principalField {
              ...ArtistOverviewRoute_artist
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
