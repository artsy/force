import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"

const PreferencesApp = loadable(
  () => import(/* webpackChunkName: "preferencesBundle" */ "./PreferencesApp"),
  {
    resolveComponent: component => component.PreferencesAppFragmentContainer,
  }
)

export const preferencesRoutes: RouteProps[] = [
  {
    path: "/unsubscribe",
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
        viewer {
          ...PreferencesApp_viewer
            @arguments(authenticationToken: $authenticationToken)
        }
      }
    `,
  },
]
