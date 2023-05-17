import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"

const HomeApp = loadable(
  () => import(/* webpackChunkName: "homeBundle" */ "./HomeApp"),
  { resolveComponent: component => component.HomeAppFragmentContainer }
)

export const homeRoutes: AppRouteConfig[] = [
  {
    path: "/",
    getComponent: () => HomeApp,
    onClientSideRender: () => {
      HomeApp.preload()
    },
    query: graphql`
      query homeRoutes_HomeQuery {
        featuredEventsOrderedSet: orderedSet(id: "529939e2275b245e290004a0") {
          ...HomeApp_featuredEventsOrderedSet
        }
        heroUnitsConnection(first: 10) {
          ...HomeApp_heroUnitsConnection
        }
      }
    `,
  },
]
