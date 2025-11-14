import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"

const MarketingMeetArtAdvisorRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "marketingBundle" */ "./Routes/MarketingMeetArtAdvisorRoute"
    ),
  { resolveComponent: component => component.MarketingMeetArtAdvisorRoute },
)

const MarketingFindArtYouLoveRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "marketingBundle" */ "./Routes/MarketingFindArtYouLoveRoute"
    ),
  { resolveComponent: component => component.MarketingFindArtYouLoveRoute },
)

export const marketingRoutes: RouteProps[] = [
  {
    path: "/meet-your-new-art-advisor",
    getComponent: () => MarketingMeetArtAdvisorRoute,
    onPreloadJS: () => {
      MarketingMeetArtAdvisorRoute.preload()
    },
  },
  {
    path: "/find-the-art-you-love",
    getComponent: () => MarketingFindArtYouLoveRoute,
    onPreloadJS: () => {
      MarketingFindArtYouLoveRoute.preload()
    },
  },
]
