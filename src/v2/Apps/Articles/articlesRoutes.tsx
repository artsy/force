import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

const ArticlesApp = loadable(
  () => import(/* webpackChunkName: "articlesBundle" */ "./ArticlesApp"),
  {
    resolveComponent: component => component.ArticlesAppFragmentContainer,
  }
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
]
