import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"

const ContactApp = loadable(
  () => import(/* webpackChunkName: "contactBundle" */ "./ContactApp"),
  {
    resolveComponent: component => component.ContactApp,
  }
)

export const contactRoutes: RouteProps[] = [
  {
    path: "/contact",
    getComponent: () => ContactApp,
  },
]
