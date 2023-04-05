import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const MarketingMeetArtAdvisorRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "marketingBundle" */ "./Routes/MarketingMeetArtAdvisorRoute"
    ),
  { resolveComponent: component => component.MarketingMeetArtAdvisorRoute }
)

const MarketingFindArtYouWantRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "marketingBundle" */ "./Routes/MarketingFindArtYouWantRoute"
    ),
  { resolveComponent: component => component.MarketingFindArtYouWantRoute }
)

export const marketingRoutes: AppRouteConfig[] = [
  {
    path: "/meet-your-new-art-advisor",
    getComponent: () => MarketingMeetArtAdvisorRoute,
    onClientSideRender: () => {
      MarketingMeetArtAdvisorRoute.preload()
    },
  },
  {
    path: "/find-the-art-you-want",
    getComponent: () => MarketingFindArtYouWantRoute,
    onClientSideRender: () => {
      MarketingFindArtYouWantRoute.preload()
    },
  },
]
