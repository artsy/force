import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteConfig } from "found"

import { ViewingRoomStatementRouteFragmentContainer as StatementRoute } from "./Routes/Statement/ViewingRoomStatementRoute"
import { ViewingRoomWorksRouteFragmentContainer as WorksRoute } from "./Routes/Works/ViewingRoomWorksRoute"

const ViewingRoomApp = loadable(() => import("./ViewingRoomApp"))

export const routes: RouteConfig[] = [
  {
    path: "/viewing-room/:slug",
    getComponent: () => ViewingRoomApp,
    prepare: () => {
      ViewingRoomApp.preload()
    },
    query: graphql`
      query routes_ViewingRoomQuery($slug: ID!) {
        viewingRoom(id: $slug) {
          ...ViewingRoomApp_viewingRoom
        }
      }
    `,
    children: [
      {
        path: "/",
        Component: StatementRoute,
        ignoreScrollBehavior: true,
        query: graphql`
          query routes_ViewingRoomStatementRouteQuery($slug: ID!) {
            viewingRoom(id: $slug) {
              ...ViewingRoomStatementRoute_viewingRoom
            }
          }
        `,
      },
      {
        path: "/works",
        Component: WorksRoute,
        ignoreScrollBehavior: true,
        query: graphql`
          query routes_ViewingRoomWorksRouteQuery($slug: ID!) {
            viewingRoom(id: $slug) {
              ...ViewingRoomWorksRoute_viewingRoom
            }
          }
        `,
      },
    ],
  },
]
