import loadable from "@loadable/component"
import { HttpError } from "found"
import { AppRouteConfig } from "v2/System/Router/Route"

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
          if (req.user?.get("type") !== "Admin") {
            throw new HttpError(403)
          }
        },
      },
    ],
  },
]
