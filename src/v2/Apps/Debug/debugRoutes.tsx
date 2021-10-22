import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"
import { DebugInquiryApp } from "./DebugInquiryApp"

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
        path: "baseline",
        Component: DebugApp,
      },
      // TODO: Remove once inquiry is complete
      {
        path: "inquiry",
        Component: DebugInquiryApp,
      },
    ],
  },
]
