import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { AppRouteConfig } from "v2/System/Router/Route"

const StaticPageApp = loadable(
  () => import(/* webpackChunkName: "page2Bundle" */ "./StaticPageApp"),
  {
    resolveComponent: component => component.StaticPageAppFragmentContainer,
  }
)

export const staticPageRoutes: AppRouteConfig[] = [
  {
    path: "/page2/:slug",
    getComponent: () => StaticPageApp,
    query: graphql`
      query staticPageRoutes_TopLevelQuery($slug: ID!) {
        page(id: $slug) {
          ...StaticPageApp_page
        }
      }
    `,
  },
]
