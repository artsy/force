import loadable from "@loadable/component"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/urlBuilder"
import { RedirectException } from "found"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"
import { initialAuctionResultsFilterState } from "./Routes/AuctionResults/AuctionResultsFilterContext"
import { getWorksForSaleRouteVariables } from "./Routes/WorksForSale/Utils/getWorksForSaleRouteVariables"
import { enableArtistPageCTA } from "./Server/enableArtistPageCTA"
import { redirectWithCanonicalParams } from "./Server/redirect"
import { allowedAuctionResultFilters } from "./Utils/allowedAuctionResultFilters"

const ArtistApp = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./ArtistApp"),
  { resolveComponent: component => component.ArtistAppFragmentContainer }
)

const ArtistSubApp = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./ArtistSubApp"),
  { resolveComponent: component => component.ArtistSubAppFragmentContainer }
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
  { resolveComponent: component => component.ArtistCVRouteFragmentContainer }
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

const ArtistSeriesRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/ArtistSeries/ArtistArtistSeriesRoute"
    ),
  {
    resolveComponent: component =>
      component.ArtistArtistSeriesRouteFragmentContainer,
  }
)

const ShowsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/Shows/ArtistShowsRoute"
    ),
  { resolveComponent: component => component.ArtistShowsRouteFragmentContainer }
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

const AuctionResultRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/AuctionResults/SingleAuctionResultPage/AuctionResult"
    ),
  { resolveComponent: component => component.AuctionResultFragmentContainer }
)

export const artistRoutes: RouteProps[] = [
  {
    path: "/artist/:artistID",
    ignoreScrollBehaviorBetweenChildren: true,
    getComponent: () => ArtistApp,
    onServerSideRender: enableArtistPageCTA,
    onClientSideRender: () => {
      ArtistApp.preload()
      OverviewRoute.preload()
      WorksForSaleRoute.preload()
    },
    query: graphql`
      query artistRoutes_ArtistAppQuery($artistID: String!) {
        artist(id: $artistID) @principalField {
          ...ArtistApp_artist
        }
      }
    `,
    children: [
      {
        path: "",
        getComponent: () => WorksForSaleRoute,
        onServerSideRender: redirectWithCanonicalParams,
        onClientSideRender: () => {
          WorksForSaleRoute.preload()
        },
        prepareVariables: getWorksForSaleRouteVariables,
        query: graphql`
          query artistRoutes_WorksForSaleQuery(
            $artistID: String!
            $input: FilterArtworksInput
            # TODO:(?) only request the artist series aggregation if user has the Unleash flag enabled?
            $aggregations: [ArtworkAggregation]
            $includeBlurHash: Boolean!
          ) {
            artist(id: $artistID) {
              ...ArtistWorksForSaleRoute_artist
                @arguments(
                  input: $input
                  aggregations: $aggregations
                  includeBlurHash: $includeBlurHash
                )
            }
          }
        `,
      },
      {
        path: "auction-results",
        getComponent: () => AuctionResultsRoute,
        onClientSideRender: () => {
          AuctionResultsRoute.preload()
        },
        prepareVariables: ({ artistID }, props) => {
          const urlFilterState = paramsToCamelCase(
            props.location ? props.location.query : {}
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
          ) {
            artist(id: $artistID) {
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
        onClientSideRender: () => {
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
    ],
  },
  {
    path: "/artist/:artistID",
    ignoreScrollBehaviorBetweenChildren: true,
    getComponent: () => ArtistSubApp,
    query: graphql`
      query artistRoutes_ArtistSubAppQuery($artistID: String!) {
        artist(id: $artistID) {
          ...ArtistSubApp_artist
        }
      }
    `,
    children: [
      {
        path: "articles/:artworkId?",
        getComponent: () => ArticlesRoute,
        onClientSideRender: () => {
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
        getComponent: () => ConsignRoute,
        onClientSideRender: () => {
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
        getComponent: () => CVRoute,
        onClientSideRender: () => {
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
        path: "series",
        getComponent: () => ArtistSeriesRoute,
        onClientSideRender: () => {
          ArtistSeriesRoute.preload()
        },
        query: graphql`
          query artistRoutes_ArtistSeriesQuery($artistID: String!) {
            artist(id: $artistID) {
              ...ArtistArtistSeriesRoute_artist
            }
          }
        `,
      },
      {
        path: "shows",
        getComponent: () => ShowsRoute,
        onClientSideRender: () => {
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
      {
        // Redirect all unhandled tabs to the artist page.
        path: ":tab?",
        render: ({ match }) => {
          throw new RedirectException(
            `/artist/${match.params.artistID}${match.location.search}`,
            301
          )
        },
      },
    ],
  },
  {
    path: "/auction-result/:auctionResultId",
    getComponent: () => AuctionResultRoute,
    onServerSideRender: enableArtistPageCTA,
    onClientSideRender: () => {
      AuctionResultRoute.preload()
    },
    query: graphql`
      query artistRoutes_AuctionResultQuery($auctionResultId: String!) {
        auctionResult(id: $auctionResultId) @principalField {
          ...AuctionResult_auctionResult
        }
      }
    `,
  },
]
