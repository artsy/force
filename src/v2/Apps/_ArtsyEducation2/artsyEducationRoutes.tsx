import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"

const ArtsyEducationApp = loadable(
  () =>
    import(
      /* webpackChunkName: "artsyEducationBundle" */ "./ArtsyEducationApp"
    ),
  {
    resolveComponent: component => component.ArtsyEducationApp,
  }
)

export const artsyEducation: AppRouteConfig[] = [
  {
    path: "/artsy-education2",
    getComponent: () => ArtsyEducationApp,
  },
]
