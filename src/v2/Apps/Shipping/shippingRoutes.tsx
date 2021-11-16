import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

const ShippingApp = loadable(
  () =>
    import(
      /* webpackChunkName: "shippingBundle" */ "./Routes/Shipping/ShippingApp"
    ),
  {
    resolveComponent: component => component.ShippingAppFragmentContainer,
  }
)

export const shippingRoutes: AppRouteConfig[] = [
  {
    // TODO: update route to /user/shipping and remove stitched route to launch
    path: "/user/shipping",
    getComponent: () => ShippingApp,
    onClientSideRender: () => {
      ShippingApp.preload()
    },
    query: graphql`
      query shippingRoutes_ShippingQuery {
        me {
          ...ShippingApp_me
        }
      }
    `,
  },
]
