import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { HttpError } from "found"

const DebugBaselineRoute = loadable(
  () => import(/* webpackChunkName: "debugBundle" */ "./DebugBaselineRoute"),
  { resolveComponent: component => component.DebugBaselineRoute },
)

const DebugAuthRoute = loadable(
  () => import(/* webpackChunkName: "debugBundle" */ "./DebugAuthRoute"),
  { resolveComponent: component => component.DebugAuthRoute },
)

const DebugClientError404Route = loadable(
  () =>
    import(/* webpackChunkName: "debugBundle" */ "./DebugClientError404Route"),
  { resolveComponent: component => component.DebugClientError404Route },
)

const DebugClientError500Route = loadable(
  () =>
    import(/* webpackChunkName: "debugBundle" */ "./DebugClientError500Route"),
  { resolveComponent: component => component.DebugClientError500Route },
)

/**
 * These routes are just for testing baseline page shell stuff -- Lighthouse,
 * Calibre, assets loaded on page, and other debugging things that might
 * impact global performance.
 */
export const debugRoutes: RouteProps[] = [
  {
    path: "/debug",
    children: [
      {
        path: "baseline",
        getComponent: () => DebugBaselineRoute,
      },
      {
        path: "auth",
        getComponent: () => DebugAuthRoute,
      },
      {
        path: "error-404",
        onServerSideRender: () => {
          throw new HttpError(404)
        },
      },
      {
        path: "client-error-404",
        getComponent: () => DebugClientError404Route,
      },
      {
        path: "error-500",
        onServerSideRender: () => {
          throw new Error("An error")
        },
      },
      {
        path: "client-error-500",
        getComponent: () => DebugClientError500Route,
      },
    ],
  },
]
