import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"

const ResetPasswordRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "authenticationBundle" */ "./Routes/ResetPasswordRoute"
    ),
  { resolveComponent: component => component.ResetPasswordRoute }
)

export const authenticationRoutes: AppRouteConfig[] = [
  {
    theme: "v3",
    path: "/reset_password2",
    getComponent: () => ResetPasswordRoute,
    prepare: () => {
      return ResetPasswordRoute.preload()
    },
  },
]
