import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

const StatementRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "viewingRoomBundle" */ "./Routes/Statement/ViewingRoomStatementRoute"
    ),
  {
    resolveComponent: component =>
      component.ViewingRoomStatementRouteFragmentContainer,
  }
)
const WorksRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "viewingRoomBundle" */ "./Routes/Works/ViewingRoomWorksRoute"
    ),
  {
    resolveComponent: component =>
      component.ViewingRoomWorksRouteFragmentContainer,
  }
)
const ViewingRoomApp = loadable(
  () => import(/* webpackChunkName: "viewingRoomBundle" */ "./ViewingRoomApp"),
  {
    resolveComponent: component => component.ViewingRoomAppFragmentContainer,
  }
)
const ViewingRoomsApp = loadable(
  () => import(/* webpackChunkName: "viewingRoomBundle" */ "./ViewingRoomsApp"),
  {
    resolveComponent: component => component.ViewingRoomsAppFragmentContainer,
  }
)

export const viewingRoomRoutes: AppRouteConfig[] = [
  {
    path: "/viewing-rooms",
    getComponent: () => ViewingRoomsApp,
    prepare: () => {
      ViewingRoomsApp.preload()
    },
    prepareVariables: () => {
      // Accomodates the grid of 3x items and 2x items well.
      return { count: 12 }
    },
    query: graphql`
      query viewingRoomRoutes_ViewingRoomsAppQuery(
        $count: Int!
        $after: String
      ) {
        allViewingRooms: viewer {
          ...ViewingRoomsApp_allViewingRooms
            @arguments(count: $count, after: $after)
        }

        featuredViewingRooms: viewingRooms(featured: true) {
          ...ViewingRoomsApp_featuredViewingRooms
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
  {
    path: "/viewing-room/:slug",
    getComponent: () => ViewingRoomApp,
    ignoreScrollBehaviorBetweenChildren: true,
    prepare: () => {
      ViewingRoomApp.preload()
    },
    query: graphql`
      query viewingRoomRoutes_ViewingRoomQuery($slug: ID!) {
        viewingRoom(id: $slug) {
          ...ViewingRoomApp_viewingRoom
        }
      }
    `,
    children: [
      {
        path: "/",
        Component: StatementRoute,
        query: graphql`
          query viewingRoomRoutes_ViewingRoomStatementRouteQuery($slug: ID!) {
            viewingRoom(id: $slug) {
              ...ViewingRoomStatementRoute_viewingRoom
            }
          }
        `,
      },
      {
        path: "works",
        Component: WorksRoute,
        query: graphql`
          query viewingRoomRoutes_ViewingRoomWorksRouteQuery($slug: ID!) {
            viewingRoom(id: $slug) {
              ...ViewingRoomWorksRoute_viewingRoom
            }
          }
        `,
      },
    ],
  },
]
