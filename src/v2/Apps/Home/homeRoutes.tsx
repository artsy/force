import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { AppRouteConfig } from "v2/System/Router/Route"

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
        homePage {
          ...HomeApp_homePage
        }
        featuredEventsOrderedSet: orderedSet(id: "529939e2275b245e290004a0") {
          ...HomeApp_featuredEventsOrderedSet
        }
      }
    `,
  },
]
