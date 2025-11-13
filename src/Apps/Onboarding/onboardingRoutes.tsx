import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"

const OnboardingApp = loadable(
  () => import(/* webpackChunkName: "onboardingBundle" */ "./OnboardingApp"),
  {
    resolveComponent: component => component.OnboardingApp,
  }
)

export const onboardingRoutes: RouteProps[] = [
  {
    path: "/onboarding2",
    getComponent: () => OnboardingApp,
    onPreloadJS: () => {
      OnboardingApp.preload()
    },
  },
]
