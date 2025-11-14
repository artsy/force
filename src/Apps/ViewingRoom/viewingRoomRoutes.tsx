import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { RedirectException } from "found"
import { graphql } from "react-relay"

const StatementRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "viewingRoomBundle" */ "./Routes/Statement/ViewingRoomStatementRoute"
    ),
  {
    resolveComponent: component =>
      component.ViewingRoomStatementRouteFragmentContainer,
  },
)
const WorksRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "viewingRoomBundle" */ "./Routes/Works/ViewingRoomWorksRoute"
    ),
  {
    resolveComponent: component =>
      component.ViewingRoomWorksRouteFragmentContainer,
  },
)
const ViewingRoomApp = loadable(
  () => import(/* webpackChunkName: "viewingRoomBundle" */ "./ViewingRoomApp"),
  {
    resolveComponent: component => component.ViewingRoomAppFragmentContainer,
  },
)
const ViewingRoomsApp = loadable(
  () => import(/* webpackChunkName: "viewingRoomBundle" */ "./ViewingRoomsApp"),
  {
    resolveComponent: component => component.ViewingRoomsAppFragmentContainer,
  },
)

export const viewingRoomRoutes: RouteProps[] = [
  {
    path: "/viewing-rooms",
    getComponent: () => ViewingRoomsApp,
    onPreloadJS: () => {
      ViewingRoomsApp.preload()
    },
    prepareVariables: () => {
      // Accomodates the grid of 3x items and 2x items well.
      return { count: 12 }
    },
    query: graphql`
      query viewingRoomRoutes_ViewingRoomsAppQuery($count: Int!, $after: String)
      @cacheable {
        allViewingRooms: viewer {
          ...ViewingRoomsApp_allViewingRooms
            @arguments(count: $count, after: $after)
        }

        featuredViewingRooms: viewingRoomsConnection(featured: true) {
          ...ViewingRoomsApp_featuredViewingRooms
        }
      }
    `,
  },
  {
    path: "/viewing-room/:slug",
    getComponent: () => ViewingRoomApp,
    ignoreScrollBehaviorBetweenChildren: true,
    onPreloadJS: () => {
      ViewingRoomApp.preload()
    },
    query: graphql`
      query viewingRoomRoutes_ViewingRoomQuery($slug: ID!) @cacheable {
        viewingRoom(id: $slug) @principalField {
          ...ViewingRoomApp_viewingRoom
        }
      }
    `,
    children: [
      {
        path: "",
        Component: StatementRoute,
        query: graphql`
          query viewingRoomRoutes_ViewingRoomStatementRouteQuery($slug: ID!)
          @cacheable {
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
