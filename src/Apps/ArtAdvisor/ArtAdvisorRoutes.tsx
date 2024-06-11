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

const ArtAdvisorApp06 = loadable(
  () => import(/* webpackChunkName: "advisorBundle" */ "./06-NearText/App"),
  {
    resolveComponent: component => component.App,
  }
)

/**
 * Helper factory function returns a route middleware to require a logged in user.
 * If no user found the middleware will force a login and redirect to a specific page.
 *
 * This works on server-side navigation; client-side navigation is handled by the client.
 */
function requireUser({ redirectTo }: { redirectTo: string }) {
  return ({ req, res }) => {
    if (!req.user) {
      res.redirect(`/login?redirectTo=${redirectTo}`)
    }
  }
}

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
    path: "/advisor/6",
    getComponent: () => ArtAdvisorApp06,
    onServerSideRender: requireUser({ redirectTo: "/advisor/6" }),
    onClientSideRender: () => {
      ArtAdvisorApp06.preload()
    },
  },
]
