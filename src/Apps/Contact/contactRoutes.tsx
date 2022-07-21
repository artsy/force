import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const ContactApp = loadable(
  () => import(/* webpackChunkName: "contactBundle" */ "./ContactApp"),
  {
    resolveComponent: component => component.ContactApp,
  }
)

export const contactRoutes: AppRouteConfig[] = [
  {
    path: "/contact",
    getComponent: () => ContactApp,
  },
]
