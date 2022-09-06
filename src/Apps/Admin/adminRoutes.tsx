import loadable from "@loadable/component"
import { HttpError } from "found"
import { AppRouteConfig } from "System/Router/Route"
import { getUser } from "Utils/user"

const AdminClearCacheApp = loadable(
  () => import(/* webpackChunkName: "adminBundle" */ "./AdminClearCacheApp"),
  { resolveComponent: component => component.AdminClearCacheApp }
)

export const adminRoutes: AppRouteConfig[] = [
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
    ],
  },
]
