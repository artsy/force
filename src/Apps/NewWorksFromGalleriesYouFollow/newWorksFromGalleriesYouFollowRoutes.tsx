import { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"
import loadable from "@loadable/component"

const NewWorksFromGalleriesYouFollowApp = loadable(
  () => import("./NewWorksFromGalleriesYouFollowApp"),
  {
    resolveComponent: component =>
      component.NewWorksFromGalleriesYouFollowAppPaginationContainer,
  }
)

export const newWorksFromGalleriesYouFollowRoutes: RouteProps[] = [
  {
    path: "/new-works-from-galleries-you-follow",
    getComponent: () => NewWorksFromGalleriesYouFollowApp,
    onClientSideRender: () => {
      NewWorksFromGalleriesYouFollowApp.preload()
    },
    query: graphql`
      query newWorksFromGalleriesYouFollowRoutes_TopLevelQuery {
        me {
          ...NewWorksFromGalleriesYouFollowApp_me
        }
      }
    `,
  },
]
