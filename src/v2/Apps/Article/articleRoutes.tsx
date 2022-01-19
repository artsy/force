import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

const ArticleApp = loadable(
  () => import(/* webpackChunkName: "articleBundle" */ "./ArticleApp"),
  {
    resolveComponent: component => component.ArticleAppFragmentContainer,
  }
)

export const articleRoutes: AppRouteConfig[] = [
  {
    path: "/article2/:id",
    Component: ArticleApp,
    onClientSideRender: () => {
      ArticleApp.preload()
    },
    query: graphql`
      query articleRoutes_ArticleQuery($id: String!) {
        article(id: $id) @principalField {
          ...ArticleApp_article
        }
      }
    `,
  },
]
