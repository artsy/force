import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const ArtAdvisorApp = loadable(
  () => import(/* webpackChunkName: "advisorBundle" */ "./ArtAdvisorApp"),
  {
    resolveComponent: component => component.ArtAdvisorApp,
  }
)

const ArtAdvisorApp01 = loadable(
  () => import(/* webpackChunkName: "advisorBundle" */ "./01-Spike/App"),
  {
    resolveComponent: component => component.App,
  }
)
const ArtAdvisorApp02 = loadable(
  () => import(/* webpackChunkName: "advisorBundle" */ "./02-Markdown/App"),
  {
    resolveComponent: component => component.App,
  }
)
const ArtAdvisorApp03 = loadable(
  () =>
    import(
      /* webpackChunkName: "advisorBundle" */ "./03-Instruction-Experiments/App"
    ),
  {
    resolveComponent: component => component.App,
  }
)

const ArtAdvisorApp04 = loadable(
  () =>
    import(
      /* webpackChunkName: "advisorBundle" */ "./04-Bio-Follows-Alerts/App"
    ),
  {
    resolveComponent: component => component.App,
  }
)

const ArtAdvisorApp05 = loadable(
  () =>
    import(/* webpackChunkName: "advisorBundle" */ "./05-Near-Object-Rail/App"),
  {
    resolveComponent: component => component.App,
  }
)

const ArtAdvisorApp06 = loadable(
  () =>
    import(
      /* webpackChunkName: "advisorBundle" */ "./06-Discovery-Neartext/App"
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
  {
    path: "/advisor/4",
    getComponent: () => ArtAdvisorApp04,
    onClientSideRender: () => {
      ArtAdvisorApp04.preload()
    },
  },
  {
    path: "/advisor/5",
    getComponent: () => ArtAdvisorApp05,
    onClientSideRender: () => {
      ArtAdvisorApp05.preload()
    },
  },
  {
    path: "/advisor/6",
    getComponent: () => ArtAdvisorApp06,
    onClientSideRender: () => {
      ArtAdvisorApp06.preload()
    },
  },
]
