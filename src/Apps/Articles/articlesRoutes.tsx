import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"

const ArticlesApp = loadable(
  () => import(/* webpackChunkName: "articlesBundle" */ "./ArticlesApp"),
  { resolveComponent: component => component.ArticlesAppFragmentContainer }
)

const NewsApp = loadable(
  () => import(/* webpackChunkName: "articlesBundle" */ "./NewsApp"),
  { resolveComponent: component => component.NewsAppFragmentContainer }
)
const ChannelApp = loadable(
  () => import(/* webpackChunkName: "articlesBundle" */ "./ChannelApp"),
  { resolveComponent: component => component.ChannelAppFragmentContainer }
)

export const articlesRoutes: RouteProps[] = [
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
    path: "/news",
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
  {
    path: "/channel/:id",
    Component: ChannelApp,
    onClientSideRender: () => {
      ChannelApp.preload()
    },
    query: graphql`
      query articlesRoutes_ChannelQuery($id: ID!) {
        channel(id: $id) @principalField {
          ...ChannelApp_channel
        }
      }
    `,
  },
]
