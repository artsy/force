import { AppRouteConfig } from "v2/System/Router/Route"
import { graphql } from "relay-runtime"
import loadable from "@loadable/component"

const NewForYouApp = loadable(() => import("./NewForYouApp"), {
  resolveComponent: component => component.NewForYouAppFragmentContainer,
})

export const newForYouRoutes: AppRouteConfig[] = [
  {
    path: "/new-for-you",
    getComponent: () => NewForYouApp,
    onClientSideRender: () => {
      NewForYouApp.preload()
    },
    query: graphql`
      query newForYouRoutes_TopLevelQuery {
        viewer {
          ...NewForYouApp_viewer
        }
      }
    `,
  },
]
