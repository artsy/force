import loadable from "@loadable/component"
import { HttpError } from "found"
import { RouteProps } from "System/Router/Route"
import { getUser } from "Utils/user"

const AdminClearCacheApp = loadable(
  () => import(/* webpackChunkName: "adminBundle" */ "./AdminClearCacheApp"),
  { resolveComponent: component => component.AdminClearCacheApp }
)

const NavigateToRoute = loadable(
  () => import(/* webpackChunkName: "adminBundle" */ "./NavigateToRoute"),
  { resolveComponent: component => component.NavigateToRoute }
)

export const adminRoutes: RouteProps[] = [
  {
    path: "/admin",
    Component: ({ children }) => children,
    children: [
      {
        path: "clear-cache",
        Component: AdminClearCacheApp,
        onServerSideRender: ({ req }) => {
          const user = getUser(req.user)
          if (user?.type !== "Admin") {
            throw new HttpError(403)
          }
        },
      },
      {
        path: "navigate-to-route",
        Component: NavigateToRoute,
        layout: "NavOnly",
      },
    ],
  },
]
