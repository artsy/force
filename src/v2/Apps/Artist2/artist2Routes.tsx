import loadable from "@loadable/component"
import { Redirect } from "found"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/Artsy/Router/Route"
import { Artist2RoutesTopLevelQuery } from "./Queries/Artist2RoutesTopLevelQuery"
import { renderOrRedirect } from "./Routes/Overview/Utils/renderOrRedirect"
import { getWorksForSaleRouteVariables } from "./Routes/WorksForSale/Utils/getWorksForSaleRouteVariables"

const ArtistApp = loadable(() => import("./Artist2App"), {
  resolveComponent: component => component.Artist2AppFragmentContainer,
})
const OverviewRoute = loadable(
  () => import("./Routes/Overview/ArtistOverviewRoute"),
  {
    resolveComponent: component =>
      component.ArtistOverviewRouteFragmentContainer,
  }
)
const WorksForSaleRoute = loadable(
  () => import("./Routes/WorksForSale/ArtistWorksForSaleRoute"),
  {
    resolveComponent: component =>
      component.ArtistWorksForSaleRouteFragmentContainer,
  }
)
const CVRoute = loadable(() => import("./Routes/CV/ArtistCVRoute"), {
  resolveComponent: component => component.ArtistCVRouteFragmentContainer,
})
const ArticlesRoute = loadable(
  () => import("./Routes/Articles/ArtistArticlesRoute"),
  {
    resolveComponent: component =>
      component.ArtistArticlesRouteFragmentContainer,
  }
)
const ShowsRoute = loadable(() => import("./Routes/Shows/ArtistShowsRoute"), {
  resolveComponent: component => component.ArtistShowsRouteFragmentContainer,
})
const AuctionResultsRoute = loadable(
  () => import("./Routes/AuctionResults/Artist2AuctionResultsRoute"),
  {
    resolveComponent: component =>
      component.AuctionResultsRouteFragmentContainer,
  }
)

// const ConsignRoute = loadable(() => import("./Routes/Consign"), {
//   resolveComponent: component => component.ConsignRouteFragmentContainer,
// })

export const artist2Routes: AppRouteConfig[] = [
  {
    path: "/artist2/:artistID",
    theme: "v3",
    getComponent: () => ArtistApp,
    prepare: () => {
      ArtistApp.preload()
    },
    query: Artist2RoutesTopLevelQuery,
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
          query artist2Routes_OverviewQuery($artistID: String!) {
            artist(id: $artistID) {
              ...ArtistOverviewRoute_artist
            }
          }
        `,
      },
      {
        path: "works-for-sale",
        theme: "v3",
        ignoreScrollBehavior: true,
        getComponent: () => WorksForSaleRoute,
        prepare: () => {
          WorksForSaleRoute.preload()
        },
        prepareVariables: getWorksForSaleRouteVariables,
        query: graphql`
          query artist2Routes_WorksForSaleQuery(
            $artistID: String!
            $input: FilterArtworksInput
            $aggregations: [ArtworkAggregation]
          ) @raw_response_type {
            artist(id: $artistID) {
              ...ArtistWorksForSaleRoute_artist
                @arguments(input: $input, aggregations: $aggregations)
            }
          }
        `,
      },
      {
        path: "articles",
        theme: "v3",
        hideNavigationTabs: true,
        getComponent: () => ArticlesRoute,
        prepare: () => {
          ArticlesRoute.preload()
        },
        query: graphql`
          query artist2Routes_ArticlesQuery($artistID: String!) {
            artist(id: $artistID) {
              ...ArtistArticlesRoute_artist
            }
          }
        `,
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
          query artist2Routes_CVQuery($artistID: String!) {
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
          query artist2Routes_ShowsQuery($artistID: String!) {
            viewer {
              ...ArtistShowsRoute_viewer
            }
          }
        `,
      },
      {
        path: "auction-results",
        theme: "v3",
        ignoreScrollBehavior: false,
        getComponent: () => AuctionResultsRoute,
        prepare: () => {
          AuctionResultsRoute.preload()
        },
        query: graphql`
          query artist2Routes_AuctionResultsQuery($artistID: String!) {
            artist(id: $artistID) {
              ...Artist2AuctionResultsRoute_artist
            }
          }
        `,
      },

      /*


      // Routes not in tabs

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
          query artist2Routes_ArtistConsignQuery($artistID: String!) {
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

            */

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
