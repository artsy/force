import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { AppRouteConfig } from "v2/System/Router/Route"

const ArticleApp = loadable(
  () => import(/* webpackChunkName: "articleBundle" */ "./ArticleApp"),
  {
    resolveComponent: component => component.ArticleApp,
  }
)

export const articleRoutes: AppRouteConfig[] = [
  {
    path: "/article2/:slug",
    getComponent: () => ArticleApp,
    query: graphql`
      query articleRoutes_TopLevelQuery($slug: String!) {
        editorialArticle(id: $slug) {
          title
        }
      }
    `,
  },
]
