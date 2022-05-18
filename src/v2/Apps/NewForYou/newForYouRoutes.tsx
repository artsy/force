import { AppRouteConfig } from "v2/System/Router/Route"
import { graphql } from "relay-runtime"
import loadable from "@loadable/component"

const NewForYouApp = loadable(() => import("./NewForYouApp"), {
  resolveComponent: component => component.NewForYouAppFragmentContainer,
})

export const newForYouRoutes: AppRouteConfig[] = [
  {
    path: "/new-for-you",
    getComponent: () => NewForYouApp,
    onServerSideRender: ({ req, res }) => {
      if (!res.locals.sd.FEATURE_FLAGS.new_for_you || !req.user) {
        res.redirect("/")
      }
    },
    onClientSideRender: () => {
      NewForYouApp.preload()
    },
    query: graphql`
      query newForYouRoutes_TopLevelQuery {
        viewer {
          ...NewForYouApp_viewer
        }
      }
    `,
  },
]
