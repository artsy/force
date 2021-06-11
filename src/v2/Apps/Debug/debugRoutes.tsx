import React from "react"
import { Title } from "react-head"
import { AppRouteConfig } from "v2/System/Router/Route"

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
        Component: () => (
          <>
            <Title>Baseline</Title>
            <div>Baseline</div>
          </>
        ),
      },
    ],
  },
]
