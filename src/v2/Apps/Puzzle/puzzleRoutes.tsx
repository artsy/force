import { AppRouteConfig } from "v2/System/Router/Route"
import Puzzle from "./Puzzle"

export const puzzleRoutes: AppRouteConfig[] = [
  {
    path: "/puzzle",
    getComponent: () => Puzzle,
    hideNav: true,
    hideFooter: true,
    cacheConfig: {
      force: true,
    },
  },
]
