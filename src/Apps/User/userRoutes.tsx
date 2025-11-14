import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
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
    path: "/user/:userID/collection/:collectionID",
    fetchPolicy: "store-and-network",
    getComponent: () => UserApp,
    onPreloadJS: () => {
      UserApp.preload()
    },
    prepareVariables: ({ userID, collectionID }) => {
      return {
        userID,
        collectionID,
      }
    },
    query: graphql`
      query userRoutes_UserQuery($userID: String!, $collectionID: String!) {
        collection(id: $collectionID, userID: $userID) {
          ...UserCollectionRoute_collection
        }
      }
    `,
  },
]
