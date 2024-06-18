import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"

const PartnerOfferCheckoutRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "partnerOfferBundle" */ "./Routes/PartnerOfferCheckout"
    ),
  {
    resolveComponent: component => component.PartnerOfferCheckout,
  }
)

export const partnerOfferRoutes: RouteProps[] = [
  {
    path: "/partner-offer/:partnerOfferID/checkout",
    getComponent: () => PartnerOfferCheckoutRoute,
    onClientSideRender: () => {
      PartnerOfferCheckoutRoute.preload()
    },
    onServerSideRender: checkIfLoggedIn,
  },
]

function checkIfLoggedIn({ req, res }) {
  if (!req.user) {
    res.redirect(`/login?redirectTo=${req.originalUrl}`)
  }
}
