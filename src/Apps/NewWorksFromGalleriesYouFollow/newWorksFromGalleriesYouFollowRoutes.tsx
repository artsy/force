import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { graphql } from "react-relay"

const NewWorksFromGalleriesYouFollowApp = loadable(
  () =>
    import(
      /* webpackChunkName: "newWorksFromGalleriesYouFollowBundle" */ "./NewWorksFromGalleriesYouFollowApp"
    ),
  {
    resolveComponent: component =>
      component.NewWorksFromGalleriesYouFollowAppPaginationContainer,
  },
)

export const newWorksFromGalleriesYouFollowRoutes: RouteProps[] = [
  {
    path: "/new-works-from-galleries-you-follow",
    getComponent: () => NewWorksFromGalleriesYouFollowApp,
    onPreloadJS: () => {
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
