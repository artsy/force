import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const ArtAdvisorApp = loadable(
  () => import(/* webpackChunkName: "jobsBundle" */ "./ArtAdvisorApp"),
  {
    resolveComponent: component => component.ArtAdvisorApp,
  }
)

const ArtAdvisorApp01 = loadable(
  () => import(/* webpackChunkName: "jobsBundle" */ "./01-Spike/App"),
  {
    resolveComponent: component => component.App,
  }
)
const ArtAdvisorApp02 = loadable(
  () => import(/* webpackChunkName: "jobsBundle" */ "./02-Markdown/App"),
  {
    resolveComponent: component => component.App,
  }
)
const ArtAdvisorApp03 = loadable(
  () =>
    import(
      /* webpackChunkName: "jobsBundle" */ "./03-Intruction-Experiments/App"
    ),
  {
    resolveComponent: component => component.App,
  }
)

export const artAdvisorRoutes: AppRouteConfig[] = [
  {
    path: "/advisor",
    getComponent: () => ArtAdvisorApp,
    onClientSideRender: () => {
      ArtAdvisorApp.preload()
    },
  },
  {
    path: "/advisor/1",
    getComponent: () => ArtAdvisorApp01,
    onClientSideRender: () => {
      ArtAdvisorApp01.preload()
    },
  },
  {
    path: "/advisor/2",
    getComponent: () => ArtAdvisorApp02,
    onClientSideRender: () => {
      ArtAdvisorApp02.preload()
    },
  },
  {
    path: "/advisor/3",
    getComponent: () => ArtAdvisorApp03,
    onClientSideRender: () => {
      ArtAdvisorApp03.preload()
    },
  },
]
