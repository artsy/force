import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const ArtworkRecommendationsApp = loadable(
  () =>
    import(
      /* webpackChunkName: "artworkRecommendationsBundle" */ "./ArtworkRecommendationsApp"
    ),
  {
    resolveComponent: component =>
      component.ArtworkRecommendationsAppFragmentContainer,
  },
)

export const artworkRecommendationsRoutes: RouteProps[] = [
  {
    path: "/artwork-recommendations",
    getComponent: () => ArtworkRecommendationsApp,
    onPreloadJS: () => {
      ArtworkRecommendationsApp.preload()
    },
    prepareVariables: (params, props) => {
      const first = Number.parseInt(props.location.query.first, 10) || 100

      return {
        ...params,
        ...props,
        first,
      }
    },
    query: graphql`
      query artworkRecommendationsRoutes_TopLevelQuery($first: Int) {
        me {
          ...ArtworkRecommendationsApp_me @arguments(first: $first)
        }
      }
    `,
  },
]
