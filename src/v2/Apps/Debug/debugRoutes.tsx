import { Text } from "@artsy/palette"
import loadable from "@loadable/component"
import { HttpError } from "found"
import { AppRouteConfig } from "v2/System/Router/Route"
import { RouterLink } from "v2/System/Router/RouterLink"
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
      {
        path: "error-404",
        onServerSideRender: () => {
          throw new HttpError(404)
        },
      },
      {
        path: "client-error-404",
        Component: () => {
          return (
            <Text mt={4} variant="sm-display">
              <RouterLink to="/artist/example-404">Click to 404</RouterLink>
            </Text>
          )
        },
      },
      {
        path: "error-500",
        onServerSideRender: () => {
          throw new Error("500")
        },
      },

      // TODO: Remove once inquiry is complete
      {
        path: "inquiry",
        Component: DebugInquiryApp,
      },
    ],
  },
]
