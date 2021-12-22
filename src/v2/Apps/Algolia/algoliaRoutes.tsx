import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"

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
    resolveComponent: component => component.AlgoliaApp,
  }
)

export const algoliaRoutes: AppRouteConfig[] = [
  {
    path: "/algolia",
    getComponent: () => AlgoliaApp,
    onClientSideRender: () => {
      AlgoliaApp.preload()
    },
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
