/* eslint-disable sort-keys-fix/sort-keys-fix */
import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"

const FeatureApp = loadable(() => import(/* webpackChunkName: "featureRoutes" */ "./FeatureApp"), {
  resolveComponent: component => component.FeatureAppFragmentContainer,
})

export const featureRoutes: RouteConfig[] = [
  {
    path: "/feature/:slug",
    getComponent: () => FeatureApp,
    prepare: () => {
      FeatureApp.preload()
    },
    query: graphql`
      query featureRoutes_FeatureQuery($slug: ID!) {
        feature(id: $slug) {
          ...FeatureApp_feature
        }
      }
    `,
  },
]
