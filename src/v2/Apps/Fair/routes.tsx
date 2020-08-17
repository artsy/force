import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"

const FairApp = loadable(() => import("./FairApp"))

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
  },
]
