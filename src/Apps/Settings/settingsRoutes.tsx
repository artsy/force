import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { RedirectException } from "found"
import { graphql } from "react-relay"

const SettingsApp = loadable(
  () => import(/* webpackChunkName: "settingsBundle" */ "./SettingsApp"),
  {
    resolveComponent: component => component.SettingsAppFragmentContainer,
  },
)

const AuctionsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/Auctions/SettingsAuctionsRoute"
    ),
  {
    resolveComponent: component =>
      component.SettingsAuctionsRouteFragmentContainer,
  },
)

const EditProfileRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/EditProfile/SettingsEditProfileRoute"
    ),
  {
    resolveComponent: component =>
      component.SettingsEditProfileRouteFragmentContainer,
  },
)

const PaymentsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/Payments/SettingsPaymentsRoute"
    ),
  {
    resolveComponent: component =>
      component.SettingsPaymentsRouteFragmentContainer,
  },
)

const OrdersRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/Orders/SettingsOrdersRoute"
    ),
  {
    resolveComponent: component =>
      component.SettingsOrdersRouteFragmentContainer,
  },
)

const InsightsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/Insights/InsightsRoute"
    ),
  {
    resolveComponent: component => component.InsightsRouteFragmentContainer,
  },
)

const EditSettingsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/EditSettings/SettingsEditSettingsRoute"
    ),
  {
    resolveComponent: component => component.SettingsEditRouteFragmentContainer,
  },
)

const ShippingRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/Shipping/SettingsShippingRoute"
    ),
  {
    resolveComponent: component =>
      component.SettingsShippingRouteFragmentContainer,
  },
)

const DeleteAccountRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/DeleteAccount/DeleteAccountRoute"
    ),
  {
    resolveComponent: component =>
      component.DeleteAccountRouteFragmentContainer,
  },
)

export const settingsRoutes: RouteProps[] = [
  {
    path: "/settings",
    getComponent: () => SettingsApp,
    onPreloadJS: () => {
      SettingsApp.preload()
    },
    query: graphql`
      query settingsRoutes_SettingsQuery {
        me @principalField {
          ...SettingsApp_me
        }
      }
    `,
    children: [
      {
        path: "auctions",
        getComponent: () => AuctionsRoute,
        onPreloadJS: () => {
          AuctionsRoute.preload()
        },
        query: graphql`
          query settingsRoutes_SettingsAuctionsRouteQuery {
            me {
              ...SettingsAuctionsRoute_me
            }
          }
        `,
      },
      {
        path: "edit-profile",
        getComponent: () => EditProfileRoute,
        onPreloadJS: () => {
          EditProfileRoute.preload()
        },
        query: graphql`
          query settingsRoutes_EditProfileRouteQuery {
            me {
              ...SettingsEditProfileRoute_me
            }
          }
        `,
      },
      {
        path: "payments",
        getComponent: () => PaymentsRoute,
        onPreloadJS: () => {
          PaymentsRoute.preload()
        },
        query: graphql`
          query settingsRoutes_PaymentsRouteQuery {
            me {
              ...SettingsPaymentsRoute_me
            }
          }
        `,
      },
      {
        path: "orders",
        getComponent: () => OrdersRoute,
        onPreloadJS: () => {
          OrdersRoute.preload()
        },
        query: graphql`
          query settingsRoutes_OrdersRouteQuery {
            me {
              ...SettingsOrdersRoute_me
            }
          }
        `,
      },
      {
        path: "saves",
        render: () => {
          throw new RedirectException("/favorites/saves", 301)
        },
      },
      {
        path: "insights",
        getComponent: () => InsightsRoute,
        onPreloadJS: () => {
          InsightsRoute.preload()
        },
        query: graphql`
          query settingsRoutes_InsightsRouteQuery {
            me {
              ...InsightsRoute_me
            }
          }
        `,
      },
      {
        path: "edit-settings",
        getComponent: () => EditSettingsRoute,
        onPreloadJS: () => {
          EditSettingsRoute.preload()
        },
        query: graphql`
          query settingsRoutes_SettingsEditSettingsRouteQuery {
            me {
              ...SettingsEditSettingsRoute_me
            }
          }
        `,
      },
      {
        path: "delete",
        getComponent: () => DeleteAccountRoute,
        onPreloadJS: () => {
          DeleteAccountRoute.preload()
        },
        query: graphql`
          query settingsRoutes_DeleteAccountRouteQuery {
            me {
              ...DeleteAccountRoute_me
            }
          }
        `,
      },
      {
        path: "shipping",
        getComponent: () => ShippingRoute,
        onPreloadJS: () => {
          ShippingRoute.preload()
        },
        query: graphql`
          query settingsRoutes_ShippingRouteQuery {
            me {
              ...SettingsShippingRoute_me
            }
          }
        `,
      },
    ],
  },
]
