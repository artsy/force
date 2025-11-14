import loadable from "@loadable/component"
import { serverCacheTTLs } from "Apps/serverCacheTTLs"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const ArticlesApp = loadable(
  () => import(/* webpackChunkName: "articlesBundle" */ "./ArticlesApp"),
  { resolveComponent: component => component.ArticlesAppFragmentContainer },
)

const NewsApp = loadable(
  () => import(/* webpackChunkName: "articlesBundle" */ "./NewsApp"),
  { resolveComponent: component => component.NewsAppFragmentContainer },
)

const ChannelApp = loadable(
  () => import(/* webpackChunkName: "articlesBundle" */ "./ChannelApp"),
  { resolveComponent: component => component.ChannelAppFragmentContainer },
)

const AuthorApp = loadable(
  () => import(/* webpackChunkName: "articlesBundle" */ "./AuthorApp"),
  { resolveComponent: component => component.AuthorApp },
)

const AuthorsApp = loadable(
  () => import(/* webpackChunkName: "articlesBundle" */ "./AuthorsApp"),
  { resolveComponent: component => component.AuthorsApp },
)

export const articlesRoutes: RouteProps[] = [
  {
    path: "/articles",
    Component: ArticlesApp,
    onPreloadJS: () => {
      ArticlesApp.preload()
    },
    query: graphql`
      query articlesRoutes_ArticlesQuery {
        viewer {
          ...ArticlesApp_viewer
        }
      }
    `,
    serverCacheTTL: serverCacheTTLs.articles,
  },
  {
    path: "/news",
    Component: NewsApp,
    onPreloadJS: () => {
      NewsApp.preload()
    },
    query: graphql`
      query articlesRoutes_NewsQuery {
        viewer {
          ...NewsApp_viewer
        }
      }
    `,
    serverCacheTTL: serverCacheTTLs.articles,
  },
  {
    path: "/channel/:id",
    Component: ChannelApp,
    onPreloadJS: () => {
      ChannelApp.preload()
    },
    query: graphql`
      query articlesRoutes_ChannelQuery($id: ID!) {
        channel(id: $id) @principalField {
          ...ChannelApp_channel
        }
      }
    `,
    serverCacheTTL: serverCacheTTLs.articles,
  },
  {
    path: "/articles/author/:id",
    Component: AuthorApp,
    onPreloadJS: () => {
      AuthorApp.preload()
    },
    query: graphql`
      query articlesRoutes_AuthorQuery($id: String!) {
        author(id: $id) @principalField {
          ...AuthorApp_author
        }
      }
    `,
    serverCacheTTL: serverCacheTTLs.articles,
  },
  {
    path: "/articles/authors",
    Component: AuthorsApp,
    onPreloadJS: () => {
      AuthorsApp.preload()
    },
  },
]
