import loadable from "@loadable/component"
import { RedirectException, RouteRenderArgs } from "found"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"

const ArticleApp = loadable(
  () => import(/* webpackChunkName: "articleBundle" */ "./ArticleApp"),
  {
    resolveComponent: component => component.ArticleAppFragmentContainer,
  }
)

const redirectToArticle = ({
  match: {
    params: { id },
  },
}: RouteRenderArgs) => {
  throw new RedirectException(`/article/${id}`, 301)
}

export const articleRoutes: RouteProps[] = [
  {
    path: "/article/:id",
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
  { path: "/news/:id", render: redirectToArticle },
  { path: "/video/:id", render: redirectToArticle },
  { path: "/post/:id", render: redirectToArticle },
  { path: "/series/:id", render: redirectToArticle },
  { path: "/series/:ignore/:id", render: redirectToArticle },
  { path: "/:ignore/article/:id", render: redirectToArticle },
  { path: "/partner/:ignore/article/:id", render: redirectToArticle },
]
