import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const PreferencesApp = loadable(
  () => import(/* webpackChunkName: "preferencesBundle" */ "./PreferencesApp"),
  {
    resolveComponent: component => component.PreferencesAppFragmentContainer,
  },
)

export const preferencesRoutes: RouteProps[] = [
  {
    path: "/unsubscribe",
    getComponent: () => PreferencesApp,
    onPreloadJS: () => {
      PreferencesApp.preload()
    },
    prepareVariables: (_params, props) => {
      const authenticationToken = props.location?.query?.authentication_token
      return { authenticationToken }
    },
    query: graphql`
      query preferencesRoutes_PreferencesQuery($authenticationToken: String) {
        viewer {
          ...PreferencesApp_viewer
            @arguments(authenticationToken: $authenticationToken)
        }
      }
    `,
  },
]
