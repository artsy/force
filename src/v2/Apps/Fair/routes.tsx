import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"

const FairApp = loadable(() => import("./FairApp"))
const FairSubApp = loadable(() => import("./FairSubApp"))
const FairExhibitorsRoute = loadable(() => import("./Routes/FairExhibitors"))
const FairArtworksRoute = loadable(() => import("./Routes/FairArtworks"))
const FairInfoRoute = loadable(() => import("./Routes/FairInfo"))

export const routes: RouteConfig[] = [
  {
    path: "/fair2/:slug",
    ignoreScrollBehavior: true,
    getComponent: () => FairApp,
    prepare: () => {
      FairApp.preload()
    },
    query: graphql`
      query routes_FairQuery($slug: String!) {
        fair(id: $slug) {
          ...FairApp_fair
        }
      }
    `,
    children: [
      {
        path: "",
        getComponent: () => FairExhibitorsRoute,
        prepare: () => {
          FairExhibitorsRoute.preload()
        },
        query: graphql`
          query routes_FairExhibitorsQuery($slug: String!) {
            fair(id: $slug) {
              ...FairExhibitors_fair
            }
          }
        `,
      },
      {
        path: "artworks",
        getComponent: () => FairArtworksRoute,
        prepare: () => {
          FairArtworksRoute.preload()
        },
        query: graphql`
          query routes_FairArtworksQuery($slug: String!) {
            fair(id: $slug) {
              ...FairArtworks_fair
            }
          }
        `,
      },
    ],
  },
  // NOTE: Nested sub-apps are mounted under the same top-level path as above.
  // The root `path: ""` matches the `FairExhibitorsRoute`.
  {
    path: "/fair2/:slug",
    getComponent: () => FairSubApp,
    prepare: () => {
      FairSubApp.preload()
    },
    query: graphql`
      query routes_FairSubAppQuery($slug: String!) {
        fair(id: $slug) {
          ...FairSubApp_fair
        }
      }
    `,
    children: [
      {
        path: "info",
        getComponent: () => FairInfoRoute,
        prepare: () => {
          FairInfoRoute.preload()
        },
        query: graphql`
          query routes_FairInfoQuery($slug: String!) {
            fair(id: $slug) {
              ...FairInfo_fair
            }
          }
        `,
      },
    ],
  },
]
