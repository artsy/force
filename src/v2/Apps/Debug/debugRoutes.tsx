import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"

const DebugApp = loadable(
  () => import(/* webpackChunkName: "debugBundle" */ "./DebugApp"),
  {
    resolveComponent: component => component.DebugApp,
  }
)

/**
 * This route is just for testing baseline page shell stuff -- Lighthouse,
 * Calibre, assets loaded on page, and other debugging things that might
 * impact global performance.
 */
export const debugRoutes: AppRouteConfig[] = [
  {
    path: "/debug",
    Component: ({ children }) => children,
    children: [
      {
        theme: "v3",
        path: "baseline",
        Component: DebugApp,
      },
    ],
  },
]
