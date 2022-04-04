import { AppRouteConfig } from "v2/System/Router/Route"
import { PuzzleApp } from "./puzzleApp"

export const puzzleRoutes: AppRouteConfig[] = [
  {
    path: "/puzzle",
    getComponent: () => PuzzleApp,
    hideNav: true,
    hideFooter: true,
    cacheConfig: {
      force: true,
    },
  },
]
