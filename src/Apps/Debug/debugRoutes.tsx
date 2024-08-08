import { Clickable, Text } from "@artsy/palette"
import loadable from "@loadable/component"
import { HttpError } from "found"
import { useState } from "react"
import { RouteProps } from "System/Router/Route"
import { RouterLink } from "System/Components/RouterLink"

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
export const debugRoutes: RouteProps[] = [
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
          throw new Error("An error")
        },
      },
      {
        path: "client-error-500",
        Component: () => {
          const [error, setError] = useState(false)

          return (
            <>
              {error && (
                // @ts-ignore
                // eslint-disable-next-line react/jsx-no-undef
                <Example />
              )}
              <Text mt={4} variant="sm-display">
                <Clickable
                  textDecoration="underline"
                  onClick={() => {
                    setError(true)
                  }}
                >
                  Click to 500
                </Clickable>
              </Text>
            </>
          )
        },
      },
    ],
  },
]
