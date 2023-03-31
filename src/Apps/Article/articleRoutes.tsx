import loadable from "@loadable/component"
import { RedirectException, RouteRenderArgs } from "found"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"

const ArticleApp = loadable(
  () => import(/* webpackChunkName: "articleBundle" */ "./ArticleApp"),
  {
    resolveComponent: component => component.ArticleAppFragmentContainer,
  }
)

const Article2App = loadable(
  () => import(/* webpackChunkName: "articleBundle" */ "./Article2App"),
  {
    resolveComponent: component => component.Article2AppFragmentContainer,
  }
)

const redirectToArticle = ({
  match: {
    params: { id },
  },
}: RouteRenderArgs) => {
  throw new RedirectException(`/article/${id}`, 301)
}

export const articleRoutes: AppRouteConfig[] = [
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
  {
    path: "/article2/:id",
    Component: Article2App,
    // onClientSideRender: () => {
    //   Article2App.preload()
    // },
    query: graphql`
      query articleRoutes_Article2Query($id: String!) {
        contentfulArticle(id: $id) @principalField {
          ...Article2App_article
        }
      }
    `,
  },
]
