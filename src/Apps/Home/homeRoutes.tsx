import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const HomeApp = loadable(
  () => import(/* webpackChunkName: "homeBundle" */ "./HomeApp"),
  { resolveComponent: component => component.HomeAppFragmentContainer },
)

export const homeRoutes: RouteProps[] = [
  {
    path: "/",
    getComponent: () => HomeApp,
    onPreloadJS: () => {
      HomeApp.preload()
    },
    prepareVariables: (_params, props) => {
      return { private: props.location.search.includes("private=true") }
    },
    query: graphql`
      query homeRoutes_HomeQuery($private: Boolean!) {
        featuredEventsOrderedSet: orderedSet(id: "529939e2275b245e290004a0") {
          ...HomeApp_featuredEventsOrderedSet
        }
        heroUnitsConnection(first: 10, private: $private) {
          ...HomeApp_heroUnitsConnection
        }
      }
    `,
  },
]
