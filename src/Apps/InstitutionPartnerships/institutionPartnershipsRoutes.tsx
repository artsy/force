import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"

const InstitutionPartnershipsApp = loadable(
  () =>
    import(
      /* webpackChunkName: "institutionPartnershipsBundle" */ "./InstitutionPartnershipsApp"
    ),
  { resolveComponent: component => component.InstitutionPartnershipsApp }
)

export const institutionPartnershipsRoutes: RouteProps[] = [
  {
    path: "/institution-partnerships",
    getComponent: () => InstitutionPartnershipsApp,
  },
]
