import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"

const ContactApp = loadable(
  () => import(/* webpackChunkName: "contactBundle" */ "./ContactApp"),
  {
    resolveComponent: component => component.ContactApp,
  },
)

export const contactRoutes: RouteProps[] = [
  {
    path: "/contact",
    getComponent: () => ContactApp,
  },
]
