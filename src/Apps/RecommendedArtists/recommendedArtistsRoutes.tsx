import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const RecommendedArtistsApp = loadable(
  () =>
    import(
      /* webpackChunkName: "recommendedArtistsBundle" */ "./RecommendedArtistsApp"
    ),
  {
    resolveComponent: component => component.RecommendedArtistsApp,
  },
)

export const recommendedArtistsRoutes: RouteProps[] = [
  {
    path: "/recommendations/artists",
    getComponent: () => RecommendedArtistsApp,
    onPreloadJS: () => {
      RecommendedArtistsApp.preload()
    },
    query: graphql`
      query recommendedArtistsRoutes_TopLevelQuery(
        $first: Int = 20
        $after: String
      ) {
        me {
          ...RecommendedArtistsApp_me @arguments(first: $first, after: $after)
        }
      }
    `,
  },
]
