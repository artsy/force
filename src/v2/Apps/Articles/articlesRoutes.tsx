import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

const ArticlesApp = loadable(
  () => import(/* webpackChunkName: "articlesBundle" */ "./ArticlesApp"),
  { resolveComponent: component => component.ArticlesAppFragmentContainer }
)

const NewsApp = loadable(
  () => import(/* webpackChunkName: "articlesBundle" */ "./NewsApp"),
  { resolveComponent: component => component.NewsAppFragmentContainer }
)

export const articlesRoutes: AppRouteConfig[] = [
  {
    path: "/articles",
    Component: ArticlesApp,
    onClientSideRender: () => {
      ArticlesApp.preload()
    },
    query: graphql`
      query articlesRoutes_ArticlesQuery {
        viewer {
          ...ArticlesApp_viewer
        }
      }
    `,
  },
  {
    path: "/news2",
    Component: NewsApp,
    onClientSideRender: () => {
      NewsApp.preload()
    },
    query: graphql`
      query articlesRoutes_NewsQuery {
        viewer {
          ...NewsApp_viewer
        }
      }
    `,
  },
]
