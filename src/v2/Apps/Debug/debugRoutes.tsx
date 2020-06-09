import React from "react"

/**
 * This route is just for testing baseline page shell stuff -- Lighthouse,
 * Calibre, assets loaded on page, and other debugging things that might
 * impact global performance.
 */
export const debugRoutes = [
  {
    path: "/debug",
    Component: ({ children }) => children,
    children: [
      {
        path: "baseline",
        Component: () => <div>Baseline</div>,
      },
    ],
  },
]
