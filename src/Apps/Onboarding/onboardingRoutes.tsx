import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"

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
    onClientSideRender: () => {
      OnboardingApp.preload()
    },
  },
]
