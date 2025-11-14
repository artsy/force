import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { graphql } from "react-relay"

const FeatureApp = loadable(
  () => import(/* webpackChunkName: "featureBundle" */ "./FeatureApp"),
  {
    resolveComponent: component => component.FeatureAppFragmentContainer,
  },
)

export const featureRoutes: RouteProps[] = [
  {
    path: "/feature/:slug",
    getComponent: () => FeatureApp,
    onPreloadJS: () => {
      FeatureApp.preload()
    },
    query: graphql`
      query featureRoutes_FeatureQuery($slug: ID!) @cacheable {
        feature(id: $slug) @principalField {
          ...FeatureApp_feature
        }
      }
    `,
  },
]
