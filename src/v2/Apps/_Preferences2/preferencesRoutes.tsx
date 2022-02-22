import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { AppRouteConfig } from "v2/System/Router/Route"

const PreferencesApp = loadable(
  () => import(/* webpackChunkName: "preferencesBundle" */ "./PreferencesApp"),
  {
    resolveComponent: component => component.PreferencesAppFragmentContainer,
  }
)

export const preferencesRoutes: AppRouteConfig[] = [
  {
    path: "/preferences2",
    getComponent: () => PreferencesApp,
    onClientSideRender: () => {
      PreferencesApp.preload()
    },
    query: graphql`
      query preferencesRoutes_PreferencesQuery {
        viewer @principalField {
          ...PreferencesApp_viewer
        }
      }
    `,
  },
]
