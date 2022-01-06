import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

const ArticlesApp = loadable(
  () => import(/* webpackChunkName: "articleBundle" */ "./ArticlesApp"),
  {
    resolveComponent: component => component.ArticlesApp,
  }
)

export const articlesRoutes: AppRouteConfig[] = [
  {
    path: "/articles2",
    getComponent: () => ArticlesApp,
    query: graphql`
      query articlesRoutes_TopLevelQuery {
        editorialArticles(limit: 2) {
          title
        }
      }
    `,
  },
]
