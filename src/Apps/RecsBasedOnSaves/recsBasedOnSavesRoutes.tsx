import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"

const RecsBasedOnSavesApp = loadable(
  () =>
    import(
      /* webpackChunkName: "recsBasedOnSavesBundle" */ "./RecsBasedOnSavesApp"
    ),
  {
    resolveComponent: component => component.RecsBasedOnSavesApp,
  },
)

export const recsBasedOnSavesRoutes: RouteProps[] = [
  {
    path: "/recs-based-on-saves",
    getComponent: () => RecsBasedOnSavesApp,
  },
]
