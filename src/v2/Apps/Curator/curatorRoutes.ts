import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { AppRouteConfig } from "v2/System/Router/Route"

export const curatorRoutes: AppRouteConfig[] = [
  {
    path: "/curator",
    displayFullPage: true,
    hideFooter: true,
    getComponent: () =>
      loadable(() => import("./CuratorApp"), {
        resolveComponent: component => component.CuratorAppFragmentContainer,
      }),
    query: graphql`
      query curatorRoutes_CuratorQuery {
        artworks: artworksConnection(first: 10) {
          edges {
            node {
              artist {
                name
                href
              }
              href
              imageUrl
              image {
                width
                height
              }
              title
              isSaved
              id
              slug
              internalID
            }
          }
        }
      }
    `,
  },
]
