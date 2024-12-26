import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"

const AdminApp = loadable(
  () => import(/* webpackChunkName: "adminBundle" */ "./AdminApp"),
  { resolveComponent: component => component.AdminApp },
)

const AdminNavigateToRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "adminBundle" */ "./Routes/AdminNavigateToRoute"
    ),
  { resolveComponent: component => component.AdminNavigateToRoute },
)

export const adminRoutes: RouteProps[] = [
  {
    path: "/admin",
    layout: "NavOnly",
    getComponent: () => AdminApp,
    children: [
      {
        path: "navigate-to-route",
        getComponent: () => AdminNavigateToRoute,
        layout: "NavOnly",
      },
    ],
  },
]
