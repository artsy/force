import loadable from "@loadable/component"
import { RedirectException } from "found"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"

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

export const viewingRoomRoutes: RouteProps[] = [
  {
    path: "/viewing-rooms",
    getComponent: () => ViewingRoomsApp,
    onClientSideRender: () => {
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
    onClientSideRender: () => {
      ViewingRoomApp.preload()
    },
    query: graphql`
      query viewingRoomRoutes_ViewingRoomQuery($slug: ID!) {
        viewingRoom(id: $slug) @principalField {
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
            viewingRoom(id: $slug) @principalField {
              ...ViewingRoomStatementRoute_viewingRoom
            }
          }
        `,
      },
      {
        path: "works",
        render: ({
          match: {
            params: { slug },
          },
        }) => {
          throw new RedirectException(`/viewing-room/${slug}/artworks`, 301)
        },
      },
      {
        path: "artworks",
        Component: WorksRoute,
        query: graphql`
          query viewingRoomRoutes_ViewingRoomWorksRouteQuery($slug: ID!) {
            viewingRoom(id: $slug) @principalField {
              ...ViewingRoomWorksRoute_viewingRoom
            }
          }
        `,
      },
    ],
  },
]
