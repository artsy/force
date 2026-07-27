import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"

const CityGuidesApp = loadable(
  () => import(/* webpackChunkName: "cityGuideBundle" */ "./CityGuidesApp"),
  { resolveComponent: component => component.CityGuidesApp },
)

export const cityGuideRoutes: RouteProps[] = [
  {
    path: "/city-guides",
    Component: CityGuidesApp,
  },
]
