import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const InstitutionPartnershipsApp = loadable(
  () =>
    import(
      /* webpackChunkName: "institutionPartnershipsBundle" */ "./InstitutionPartnershipsApp"
    ),
  { resolveComponent: component => component.InstitutionPartnershipsApp }
)

export const institutionPartnershipsRoutes: AppRouteConfig[] = [
  {
    path: "/institution-partnerships",
    getComponent: () => InstitutionPartnershipsApp,
  },
]
