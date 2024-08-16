import loadable from "@loadable/component"
import { RedirectException } from "found"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"
import { enableArtistPageCTA } from "./Server/enableArtistPageCTA"
import { redirectWithCanonicalParams } from "./Server/redirect"
import { allowedAuctionResultFilters } from "./Utils/allowedAuctionResultFilters"
import { serverCacheTTLs } from "Apps/serverCacheTTLs"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import { getWorksForSaleRouteVariables } from "./Routes/WorksForSale/Utils/getWorksForSaleRouteVariables"
import { initialAuctionResultsFilterState } from "Apps/Artist/Routes/AuctionResults/initialAuctionResultsFilterState"

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
    serverCacheTTL: serverCacheTTLs.artist,
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
        serverCacheTTL: serverCacheTTLs.artist,
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
            artist(id: $artistID) @principalField {
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
        serverCacheTTL: serverCacheTTLs.artist,
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
        serverCacheTTL: serverCacheTTLs.artist,
        getComponent: () => OverviewRoute,
        onServerSideRender: enableArtistPageCTA,
        onClientSideRender: () => {
          OverviewRoute.preload()
        },
        query: graphql`
          query artistRoutes_OverviewQuery($artistID: String!) {
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
    serverCacheTTL: serverCacheTTLs.artist,
    ignoreScrollBehaviorBetweenChildren: true,
    getComponent: () => ArtistSubApp,
    query: graphql`
      query artistRoutes_ArtistSubAppQuery($artistID: String!) {
        artist(id: $artistID) @principalField {
          ...ArtistSubApp_artist
        }
      }
    `,
    children: [
      {
        path: "articles/:artworkId?",
        serverCacheTTL: serverCacheTTLs.artist,
        getComponent: () => ArticlesRoute,
        onClientSideRender: () => {
          ArticlesRoute.preload()
        },
        query: graphql`
          query artistRoutes_ArticlesQuery($artistID: String!) {
            artist(id: $artistID) @principalField {
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
            artist(id: $artistID) @principalField {
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
        serverCacheTTL: serverCacheTTLs.artist,
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
        serverCacheTTL: serverCacheTTLs.artist,
        getComponent: () => ArtistSeriesRoute,
        onClientSideRender: () => {
          ArtistSeriesRoute.preload()
        },
        query: graphql`
          query artistRoutes_ArtistSeriesQuery($artistID: String!) {
            artist(id: $artistID) @principalField {
              ...ArtistArtistSeriesRoute_artist
            }
          }
        `,
      },
      {
        path: "shows",
        serverCacheTTL: serverCacheTTLs.artist,
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
    serverCacheTTL: serverCacheTTLs.artist,
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
