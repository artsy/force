import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const TagApp = loadable(
  () => import(/* webpackChunkName: "tagBundle" */ "./TagApp"),
  {
    resolveComponent: component => component.TagAppFragmentContainer,
  },
)

export const tagRoutes: RouteProps[] = [
  {
    path: "/tag/:slug",
    getComponent: () => TagApp,
    onPreloadJS: () => {
      TagApp.preload()
    },

    query: graphql`
      query tagRoutes_TagQuery($slug: String!) @cacheable {
        tag(id: $slug) @principalField {
          ...TagApp_tag
        }
      }
    `,
  },
]
