import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const UserApp = loadable(
  () =>
    import(/* webpackChunkName: "userBundle" */ "./Routes/UserCollectionRoute"),
  {
    resolveComponent: component =>
      component.UserCollectionRouteFragmentContainer,
  },
)

export const userRoutes: RouteProps[] = [
  {
    path: "/user/:userId/collection/:collectionId",
    fetchPolicy: "store-and-network",
    getComponent: () => UserApp,
    onPreloadJS: () => {
      UserApp.preload()
    },
    prepareVariables: ({ userId, collectionId }) => {
      return {
        userId,
        collectionId,
      }
    },
    query: graphql`
      query userRoutes_UserQuery($userId: String!, $collectionId: String!) {
        collection(id: $collectionId, userID: $userId) {
          ...UserCollectionRoute_collection
        }
      }
    `,
  },
]
