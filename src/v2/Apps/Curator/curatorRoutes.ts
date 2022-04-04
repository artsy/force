import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { AppRouteConfig } from "v2/System/Router/Route"

const CuratorApp = loadable(() => import("./CuratorApp"), {
  resolveComponent: component => component.CuratorAppFragmentContainer,
})

const CuratorWelcomeRoute = loadable(() => import("./Routes/CuratorWelcome"), {
  resolveComponent: component => component.CuratorWelcomeFragmentContainer,
})

const CuratorQuizRoute = loadable(() => import("./Routes/CuratorQuiz"), {
  resolveComponent: component => component.CuratorQuizFragmentContainer,
})

const CuratorQuizByGeneRoute = loadable(() => import("./Routes/CuratorQuiz"), {
  resolveComponent: component => component.CuratorQuizByGeneFragmentContainer,
})

export const curatorRoutes: AppRouteConfig[] = [
  {
    path: "/curator",
    displayFullPage: true,
    hideFooter: true,
    getComponent: () => CuratorApp,
    onClientSideRender: () => {
      return CuratorApp.preload()
    },
    children: [
      {
        path: "",
        getComponent: () => CuratorWelcomeRoute,
        query: graphql`
          query curatorRoutes_CuratorWelcomeQuery {
            geneFamiliesConnection {
              edges {
                node {
                  name
                  slug
                  genes {
                    name
                    slug
                  }
                }
              }
            }
          }
        `,
      },
      { path: "all-artworks", getComponent: () => CuratorQuizRoute },
      { path: ":geneID", getComponent: () => CuratorQuizByGeneRoute },
    ],
    // query: graphql`
    //   query curatorRoutes_CuratorQuery {
    //     artworks: artworksConnection(first: 10) {
    //       edges {
    //         node {
    //           artist {
    //             name
    //             href
    //           }
    //           href
    //           imageUrl
    //           image {
    //             width
    //             height
    //           }
    //           title
    //           isSaved
    //           id
    //           slug
    //           internalID
    //         }
    //       }
    //     }
    //   }
    // `,
  },
]
