import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { graphql } from "react-relay"

const ArtworkRecommendationsApp = loadable(
  () =>
    import(
      /* webpackChunkName: "artworkRecommendationsBundle" */ "./ArtworkRecommendationsApp"
    ),
  {
    resolveComponent: component => component.ArtworkRecommendationsApp,
  },
)

export const artworkRecommendationsRoutes: RouteProps[] = [
  {
    path: "/recommendations/artworks",
    getComponent: () => ArtworkRecommendationsApp,
    onPreloadJS: () => {
      ArtworkRecommendationsApp.preload()
    },
    query: graphql`
      query artworkRecommendationsRoutes_TopLevelQuery(
        $first: Int = 20
        $after: String
      ) {
        me {
          ...ArtworkRecommendationsApp_me
            @arguments(first: $first, after: $after)
        }
      }
    `,
  },
]
