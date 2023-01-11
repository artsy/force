import { Text } from "@artsy/palette"
import loadable from "@loadable/component"
import { HttpError } from "found"
import { AppRouteConfig } from "System/Router/Route"
import { RouterLink } from "System/Router/RouterLink"

const DebugApp = loadable(
  () => import(/* webpackChunkName: "debugBundle" */ "./DebugApp"),
  { resolveComponent: component => component.DebugApp }
)

const DebugAuth = loadable(
  () => import(/* webpackChunkName: "debugBundle" */ "./DebugAuth"),
  { resolveComponent: component => component.DebugAuth }
)

/**
 * This route is just for testing baseline page shell stuff -- Lighthouse,
 * Calibre, assets loaded on page, and other debugging things that might
 * impact global performance.
 */
export const debugRoutes: AppRouteConfig[] = [
  {
    path: "/debug",
    children: [
      {
        path: "baseline",
        Component: DebugApp,
      },
      // TODO: Remove this route once new AuthDialog is deployed
      {
        path: "auth",
        Component: DebugAuth,
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
    ],
  },
]
