import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"
import { PrivateSaleConditions } from "./PrivateSaleConditions"

const PrivateSaleConditionsApp = loadable(
  () =>
    import(
      /* webpackChunkName: "privateSaleConditionsBundle" */ "./PrivateSaleConditions"
    ),
  {
    resolveComponent: component => component.PrivateSaleConditions,
  }
)

export const privateSaleConditionsRoutes: AppRouteConfig[] = [
  {
    path: "/private-sale-conditions",
    getComponent: () => PrivateSaleConditions,
    onServerSideRender: ({ req, res }) => {
      if (!req.user) {
        res.redirect(`/login?redirectTo=${req.originalUrl}`)
      }
    },
    onClientSideRender: ({ match }) => {
      if (!match.context.user) {
        const redirectTo = match.location.pathname + match.location.search
        match.router.push(
          `/login?redirectTo=${redirectTo}&afterSignUpAction=${redirectTo}`
        )
      } else {
        PrivateSaleConditionsApp.preload()
      }
    },
  },
]
