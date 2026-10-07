import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"

const CityGuideApp = loadable(
  () => import(/* webpackChunkName: "cityGuideBundle" */ "./CityGuideApp"),
  {
    resolveComponent: component => component.CityGuideApp,
  },
)

export const cityGuideRoutes: RouteProps[] = [
  {
    path: "/city-guide-on-app",
    getComponent: () => CityGuideApp,
    onPreloadJS: () => {
      CityGuideApp.preload()
    },
  },
]
