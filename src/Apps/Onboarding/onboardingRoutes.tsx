import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"

const OnboardingApp = loadable(
  () => import(/* webpackChunkName: "onboardingBundle" */ "./OnboardingApp"),
  {
    resolveComponent: component => component.OnboardingApp,
  },
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
