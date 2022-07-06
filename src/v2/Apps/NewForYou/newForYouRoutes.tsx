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
      const includeBackfill = props.location.query.includeBackfill ?? true

      return {
        ...params,
        ...props,
        first,
        includeBackfill,
      }
    },
    query: graphql`
      query newForYouRoutes_TopLevelQuery(
        $first: Int
        $includeBackfill: Boolean!
      ) {
        viewer {
          ...NewForYouApp_viewer
            @arguments(first: $first, includeBackfill: $includeBackfill)
        }
      }
    `,
  },
]
