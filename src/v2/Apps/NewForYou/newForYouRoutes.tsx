import { NewForYouApp } from "./NewForYouApp"
import { AppRouteConfig } from "v2/System/Router/Route"

export const newForYouRoutes: AppRouteConfig[] = [
  {
    path: "/new-for-you",
    getComponent: () => NewForYouApp,
    onServerSideRender: ({ req, res }) => {
      if (!req.user) {
        res.redirect("/")
      }
    },
  },
]
