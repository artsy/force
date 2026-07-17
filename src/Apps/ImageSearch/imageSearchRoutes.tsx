import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const ImageSearchApp = loadable(
  () => import(/* webpackChunkName: "imageSearchBundle" */ "./ImageSearchApp"),
  {
    resolveComponent: component => component.ImageSearchAppFragmentContainer,
  },
)

const prepareVariables = (_params, { location }) => {
  const { s3Key, s3Bucket } = location.query

  return {
    s3Key: s3Key != null ? String(s3Key) : "",
    s3Bucket: s3Bucket != null ? String(s3Bucket) : "",
  }
}

export const imageSearchRoutes: RouteProps[] = [
  {
    path: "/image-search",
    getComponent: () => ImageSearchApp,
    onPreloadJS: () => {
      ImageSearchApp.preload()
    },
    prepareVariables,
    query: graphql`
      query imageSearchRoutes_TopLevelQuery(
        $first: Int = 30
        $s3Key: String!
        $s3Bucket: String!
      ) {
        viewer {
          ...ImageSearchApp_viewer
            @arguments(first: $first, s3Key: $s3Key, s3Bucket: $s3Bucket)
        }
      }
    `,
  },
]
