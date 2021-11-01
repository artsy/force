import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { AppRouteConfig } from "v2/System/Router/Route"

const UnsubscribeApp = loadable(
  () => import(/* webpackChunkName: "unsubscribeBundle" */ "./UnsubscribeApp"),
  { resolveComponent: component => component.UnsubscribeAppFragmentContainer }
)

export const unsubscribeRoutes: AppRouteConfig[] = [
  {
    path: "/unsubscribe",
    getComponent: () => UnsubscribeApp,
    onClientSideRender: () => {
      UnsubscribeApp.preload()
    },
    query: graphql`
      query unsubscribeRoutes_UnsubscribeQuery {
        me {
          ...UnsubscribeApp_me
        }
      }
    `,
  },
]
