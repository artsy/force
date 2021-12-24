import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"
import { graphql } from "react-relay"

const AlgoliaApp = loadable(
  () => import(/* webpackChunkName: "algoliaBundle" */ "./AlgoliaApp"),
  {
    resolveComponent: component => component.AlgoliaApp,
  }
)

const AlgoliaHome = loadable(
  () => import(/* webpackChunkName: "algoliaBundle" */ "./routes/AlgoliaHome"),
  {
    resolveComponent: component => component.AlgoliaHome,
  }
)

const AlgoliaResult = loadable(
  () =>
    import(
      /* webpackChunkName: "algoliaBundle" */ "./routes/AlgoliaResults/AlgoliaResults"
    ),
  {
    resolveComponent: component => component.AlgoliaResultsFragmentContainer,
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
        path: "/",
        getComponent: () => AlgoliaHome,
        onClientSideRender: () => {
          AlgoliaHome.preload()
        },
      },
      {
        path: "results",
        getComponent: () => AlgoliaResult,
        onClientSideRender: () => {
          AlgoliaResult.preload()
        },
        query: graphql`
          query algoliaRoutes_AlgoliaResultsQuery {
            system {
              ...AlgoliaResults_system
            }
          }
        `,
      },
    ],
  },
]
