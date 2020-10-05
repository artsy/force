import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"

const ShowApp = loadable(() => import("./ShowApp"))

export const routes: RouteConfig[] = [
  {
    path: "/show2/:slug",
    getComponent: () => ShowApp,
    prepare: () => {
      ShowApp.preload()
    },
    query: graphql`
      query routes_ShowQuery($slug: String!) {
        show(id: $slug) {
          ...ShowApp_show
        }
      }
    `,
  },
]
