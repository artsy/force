import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"

const MarketingMeetArtAdvisorRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "marketingBundle" */ "./Routes/MarketingMeetArtAdvisorRoute"
    ),
  { resolveComponent: component => component.MarketingMeetArtAdvisorRoute }
)

const MarketingFindArtYouLoveRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "marketingBundle" */ "./Routes/MarketingFindArtYouLoveRoute"
    ),
  { resolveComponent: component => component.MarketingFindArtYouLoveRoute }
)

export const marketingRoutes: RouteProps[] = [
  {
    path: "/meet-your-new-art-advisor",
    getComponent: () => MarketingMeetArtAdvisorRoute,
    onClientSideRender: () => {
      MarketingMeetArtAdvisorRoute.preload()
    },
  },
  {
    path: "/find-the-art-you-love",
    getComponent: () => MarketingFindArtYouLoveRoute,
    onClientSideRender: () => {
      MarketingFindArtYouLoveRoute.preload()
    },
  },
]
