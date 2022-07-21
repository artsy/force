import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const OnboardingApp = loadable(
  () => import(/* webpackChunkName: "onboardingBundle" */ "./OnboardingApp"),
  {
    resolveComponent: component => component.OnboardingApp,
  }
)

export const onboardingRoutes: AppRouteConfig[] = [
  {
    path: "/onboarding2",
    getComponent: () => OnboardingApp,
    onClientSideRender: () => {
      OnboardingApp.preload()
    },
  },
]
