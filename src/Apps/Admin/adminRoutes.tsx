import loadable from "@loadable/component"
import { HttpError } from "found"
import { RouteProps } from "System/Router/Route"
import { getUser } from "Utils/user"

const AdminApp = loadable(
  () => import(/* webpackChunkName: "adminBundle" */ "./AdminApp"),
  { resolveComponent: component => component.AdminApp }
)

const AdminCacheManagementRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "adminBundle" */ "./Routes/AdminCacheManagementRoute"
    ),
  { resolveComponent: component => component.AdminCacheManagementRoute }
)

const AdminNavigateToRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "adminBundle" */ "./Routes/AdminNavigateToRoute"
    ),
  { resolveComponent: component => component.AdminNavigateToRoute }
)

export const adminRoutes: RouteProps[] = [
  {
    path: "/admin",
    layout: "NavOnly",
    getComponent: () => AdminApp,
    children: [
      {
        path: "cache",
        layout: "NavOnly",
        getComponent: () => AdminCacheManagementRoute,
        onServerSideRender: ({ req }) => {
          const user = getUser(req.user)
          if (user?.type !== "Admin") {
            throw new HttpError(403)
          }
        },
      },
      {
        path: "navigate-to-route",
        getComponent: () => AdminNavigateToRoute,
        layout: "NavOnly",
      },
    ],
  },
]
