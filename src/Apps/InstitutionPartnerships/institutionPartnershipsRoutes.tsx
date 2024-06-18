import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"

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
