import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"

const FairApp = loadable(() => import("./FairApp"))
const FairOverviewRoute = loadable(() => import("./Routes/FairOverview"))
const FairInfoRoute = loadable(() => import("./Routes/FairInfo"))

export const routes: RouteConfig[] = [
  {
    path: "/fair2/:slug",
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
        path: "/",
        getComponent: () => FairOverviewRoute,
        prepare: () => {
          FairOverviewRoute.preload()
        },
        query: graphql`
          query routes_FairOverviewQuery($slug: String!) {
            fair(id: $slug) {
              ...FairOverview_fair
            }
          }
        `,
      },
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
