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
    prepareVariables: (params, props) => {
      const first = parseInt(props.location.query.first, 10) || 20

      return {
        ...params,
        ...props,
        first,
      }
    },
    query: graphql`
      query newForYouRoutes_TopLevelQuery($first: Int) {
        viewer {
          ...NewForYouApp_viewer @arguments(first: $first)
        }
      }
    `,
  },
]
