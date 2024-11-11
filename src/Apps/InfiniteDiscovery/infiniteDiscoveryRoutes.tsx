import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const InfiniteDiscoveryApp = loadable(
  () =>
    import(/* webpackChunkName: "discoveryBundle" */ "./InfiniteDiscoveryApp"),
  {
    resolveComponent: component =>
      component.InfiniteDiscoveryAppFragmentContainer,
  }
)

export const infiniteDiscoveryRoutes: RouteProps[] = [
  {
    path: "/infinite-discovery",
    getComponent: () => InfiniteDiscoveryApp,
    onClientSideRender: () => {
      InfiniteDiscoveryApp.preload()
    },
    prepareVariables: (_params, props) => {
      return {
        userId: props.context.user.id,
      }
    },
    query: graphql`
      query infiniteDiscoveryRoutes_InfiniteDiscoveryAppQuery(
        $userId: String!
      ) {
        discoverArtworks(userId: $userId, useRelatedArtworks: true) {
          ...InfiniteDiscoveryApp_artworks
        }
      }
    `,
  },
]
