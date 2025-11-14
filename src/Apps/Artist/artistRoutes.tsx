import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { RedirectException } from "found"
import { graphql } from "react-relay"
import { enableArtistPageCTA } from "./Server/enableArtistPageCTA"
import { redirectAuctionResultsParamsToNamespace } from "./Server/redirect"

const ArtistApp = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./ArtistApp"),
  { resolveComponent: component => component.ArtistAppFragmentContainer },
)

const ArtistSubApp = loadable(
  () => import(/* webpackChunkName: "artistBundle" */ "./ArtistSubApp"),
  { resolveComponent: component => component.ArtistSubAppFragmentContainer },
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
      ArtistABTestRoute.preload()
    },
    query: graphql`
      query artistRoutes_ArtistAppQuery($artistID: String!) @cacheable {
        artist(id: $artistID) @principalField {
          ...ArtistApp_artist
          ...ArtistABTestRoute_artist
        }
      }
    `,
    children: [
      {
        path: "",
        getComponent: () => ArtistABTestRoute,
        query: graphql`
          query artistRoutes_ArtistRootQuery($artistID: String!) @cacheable {
            artist(id: $artistID) @principalField {
              ...ArtistABTestRoute_artist
            }
          }
        `,
      },
      {
        path: "auction-results",
        getComponent: () => ArtistABTestRoute,
        onServerSideRender: redirectAuctionResultsParamsToNamespace,
        query: graphql`
          query artistRoutes_ArtistAuctionResultsQuery($artistID: String!)
          @cacheable {
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
        query: graphql`
          query artistRoutes_ArtistAboutQuery($artistID: String!) @cacheable {
            artist(id: $artistID) @principalField {
              ...ArtistABTestRoute_artist
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
