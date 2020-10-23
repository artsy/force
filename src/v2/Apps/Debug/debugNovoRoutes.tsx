import React from "react"
import { Title } from "react-head"

/**
 * This route is just for testing baseline page shell stuff -- Lighthouse,
 * Calibre, assets loaded on page, and other debugging things that might
 * impact global performance.
 */
export const debugNovoRoutes = [
  {
    path: "/novo/debug",
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
