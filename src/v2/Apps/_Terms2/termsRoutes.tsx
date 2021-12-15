import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"

const TermsApp = loadable(
  () => import(/* webpackChunkName: "termsBundle" */ "./TermsApp"),
  {
    resolveComponent: component => component.TermsApp,
  }
)

export const termsRoutes: AppRouteConfig[] = [
  {
    path: "terms-and-conditions2",
    getComponent: () => TermsApp,
  },
]
