import loadable from "@loadable/component"
// import { RedirectException } from "found"
// import React from "react"
import { graphql } from "react-relay"
// import { hasSections as showMarketInsights } from "v2/Apps/Artist/Components/MarketInsights/MarketInsights"
import { paramsToCamelCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { getENV } from "v2/Utils/getENV"
// import { hasOverviewContent } from "./Components/NavigationTabs"
import { initialArtworkFilterState } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { allowedFilters } from "v2/Components/ArtworkFilter/Utils/allowedFilters"
import { AppRouteConfig } from "v2/Artsy/Router/Route"
import { renderOrRedirect } from "./Routes/Overview/Utils/renderOrRedirect"
// import { data as sd } from "sharify"

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
// const AuctionResultsRoute = loadable(() => import("./Routes/AuctionResults"), {
//   resolveComponent: component => component.AuctionResultsRouteFragmentContainer,
// })
// const ConsignRoute = loadable(() => import("./Routes/Consign"), {
//   resolveComponent: component => component.ConsignRouteFragmentContainer,
// })
// const CVRoute = loadable(() => import("./Routes/CV"), {
//   resolveComponent: component => component.CVRouteFragmentContainer,
// })
// const ArticlesRoute = loadable(() => import("./Routes/Articles"), {
//   resolveComponent: component => component.ArticlesRouteFragmentContainer,
// })
// const ShowsRoute = loadable(() => import("./Routes/Shows"), {
//   resolveComponent: component => component.ShowsRouteFragmentContainer,
// })

export const artist2Routes: AppRouteConfig[] = [
  {
    path: "/artist2/:artistID",
    theme: "v3",
    getComponent: () => ArtistApp,
    prepare: () => {
      ArtistApp.preload()
    },
    query: graphql`
      query artist2Routes_ArtistTopLevelQuery($artistID: String!) {
        artist(id: $artistID) @principalField {
          ...Artist2App_artist
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
            # Alias due to obscure Graphql validation warning
            artistPartnersConnection: partnersConnection(
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
        prepareVariables: ({ artistID }, props) => {
          // FIXME: The initial render includes `location` in props, but subsequent
          // renders (such as tabbing back to this route in your browser) will not.
          const filterStateFromUrl = props.location ? props.location.query : {}

          const filterParams = {
            ...initialArtworkFilterState,
            ...paramsToCamelCase(filterStateFromUrl),
          }
          const aggregations = ["MEDIUM", "TOTAL", "MAJOR_PERIOD"]
          const additionalAggregations = getENV("ENABLE_NEW_ARTWORK_FILTERS")
            ? ["PARTNER", "LOCATION_CITY", "MATERIALS_TERMS"]
            : ["GALLERY", "INSTITUTION"]
          const allAggregations = aggregations.concat(additionalAggregations)

          return {
            input: allowedFilters(filterParams),
            aggregations: allAggregations,
            artistID,
          }
        },
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
      /*
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
              ...AuctionResults_artist
            }
          }
        `,
      },

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
      {
        path: "cv",
        hideNavigationTabs: true,
        getComponent: () => CVRoute,
        prepare: () => {
          CVRoute.preload()
        },
        query: graphql`
          query artist2Routes_CVQuery($artistID: String!) {
            viewer {
              ...CV_viewer
            }
          }
        `,
      },
      {
        path: "articles",
        hideNavigationTabs: true,
        getComponent: () => ArticlesRoute,
        prepare: () => {
          ArticlesRoute.preload()
        },
        query: graphql`
          query artist2Routes_ArticlesQuery($artistID: String!) {
            artist(id: $artistID) {
              ...Articles_artist
            }
          }
        `,
      },
      {
        path: "shows",
        hideNavigationTabs: true,
        getComponent: () => ShowsRoute,
        prepare: () => {
          ShowsRoute.preload()
        },
        query: graphql`
          query artist2Routes_ShowsQuery($artistID: String!) {
            viewer {
              ...Shows_viewer
            }
          }
        `,
      },
      */

      /**
       * Redirect all unhandled tabs to the artist page.
       *
       * Note: there is a deep-linked standalone auction-lot page in Force,
       * under /artist/:artistID/auction-result/:id. That app needs to be
       * mounted before this app for that to work and not get caught here.
       */
      // new Redirect({
      //   from: "*",
      //   to: "/artist/:artistID",
      // }) as any,
    ],
  },
]
