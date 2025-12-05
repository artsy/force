import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { RedirectException } from "found"
import { compact } from "lodash"
import { stringify } from "qs"
import { graphql } from "react-relay"
import { enableArtistPageCTA } from "./Server/enableArtistPageCTA"
import { rewriteAuctionResultsParamsToNamespace } from "./Server/redirect"

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

const ArtistCombinedRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "artistBundle" */ "./Routes/Combined/ArtistCombinedRoute"
    ),
  {
    resolveComponent: component =>
      component.ArtistCombinedRouteFragmentContainer,
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
      ArtistCombinedRoute.preload()
    },
    query: graphql`
      query artistRoutes_ArtistAppQuery($artistID: String!) @cacheable {
        artist(id: $artistID) @principalField {
          ...ArtistApp_artist
          ...ArtistCombinedRoute_artist
        }
      }
    `,
    children: [
      {
        path: "",
        getComponent: () => ArtistCombinedRoute,
        query: graphql`
          query artistRoutes_ArtistRootQuery($artistID: String!) @cacheable {
            artist(id: $artistID) @principalField {
              ...ArtistCombinedRoute_artist
            }
          }
        `,
      },
      {
        path: "auction-results",
        getComponent: () => ArtistCombinedRoute,
        query: graphql`
          query artistRoutes_ArtistAuctionResultsQuery($artistID: String!)
          @cacheable {
            artist(id: $artistID) @principalField {
              ...ArtistCombinedRoute_artist
            }
          }
        `,
        render: ({ match }) => {
          const basePath = `/artist/${match.params.artistID}`
          const queryString = stringify(
            rewriteAuctionResultsParamsToNamespace(match.location.query),
          )
          const hash = "#artistAuctionResultsTop"
          const redirectUrl = compact([basePath, queryString]).join("?") + hash
          throw new RedirectException(redirectUrl, 301)
        },
      },
      {
        path: "about",
        getComponent: () => ArtistCombinedRoute,
        onServerSideRender: enableArtistPageCTA,
        query: graphql`
          query artistRoutes_ArtistAboutQuery($artistID: String!) @cacheable {
            artist(id: $artistID) @principalField {
              ...ArtistCombinedRoute_artist
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
