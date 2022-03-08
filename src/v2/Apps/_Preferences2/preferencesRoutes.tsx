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
    prepareVariables: (_params, props) => {
      const authenticationToken = props.location?.query?.authentication_token
      return { authenticationToken }
    },
    query: graphql`
      query preferencesRoutes_PreferencesQuery($authenticationToken: String) {
        viewer @principalField {
          ...PreferencesApp_viewer
            @arguments(authenticationToken: $authenticationToken)
        }
      }
    `,
  },
]
