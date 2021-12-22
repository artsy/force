import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"
import { graphql } from "react-relay"

const AlgoliaResults = loadable(
  () =>
    import(/* webpackChunkName: "algoliaBundle" */ "./Routes/AlgoliaResults"),
  {
    resolveComponent: component => component.AlgoliaResults,
  }
)

const AlgoliaApp = loadable(
  () => import(/* webpackChunkName: "algoliaBundle" */ "./AlgoliaApp"),
  {
    resolveComponent: component => component.AlgoliaAppFragmentContainer,
  }
)

export const algoliaRoutes: AppRouteConfig[] = [
  {
    path: "/algolia",
    getComponent: () => AlgoliaApp,
    onClientSideRender: () => {
      AlgoliaApp.preload()
    },
    query: graphql`
      query algoliaRoutes_AlgoliaQuery {
        system {
          ...AlgoliaApp_system
        }
      }
    `,
    children: [
      {
        path: "results",
        getComponent: () => AlgoliaResults,
        onClientSideRender: () => {
          AlgoliaResults.preload()
        },
      },
    ],
  },
]
