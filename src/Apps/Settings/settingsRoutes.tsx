import loadable from "@loadable/component"
import { RedirectException } from "found"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"

const SettingsApp = loadable(
  () => import(/* webpackChunkName: "settingsBundle" */ "./SettingsApp"),
  {
    resolveComponent: component => component.SettingsAppFragmentContainer,
  }
)

const AuctionsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/Auctions/SettingsAuctionsRoute"
    ),
  {
    resolveComponent: component =>
      component.SettingsAuctionsRouteFragmentContainer,
  }
)

const EditProfileRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/EditProfile/SettingsEditProfileRoute"
    ),
  {
    resolveComponent: component =>
      component.SettingsEditProfileRouteFragmentContainer,
  }
)

const PaymentsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/Payments/SettingsPaymentsRoute"
    ),
  {
    resolveComponent: component =>
      component.SettingsPaymentsRouteFragmentContainer,
  }
)

const PurchasesRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/Purchases/SettingsPurchasesRoute"
    ),
  {
    resolveComponent: component =>
      component.SettingsPurchasesRouteFragmentContainer,
  }
)

const InsightsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/Insights/InsightsRoute"
    ),
  {
    resolveComponent: component => component.InsightsRouteFragmentContainer,
  }
)

const EditSettingsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/EditSettings/SettingsEditSettingsRoute"
    ),
  {
    resolveComponent: component => component.SettingsEditRouteFragmentContainer,
  }
)

const ShippingRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/Shipping/SettingsShippingRoute"
    ),
  {
    resolveComponent: component =>
      component.SettingsShippingRouteFragmentContainer,
  }
)

const DeleteAccountRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/DeleteAccount/DeleteAccountRoute"
    ),
  {
    resolveComponent: component =>
      component.DeleteAccountRouteFragmentContainer,
  }
)

export const settingsRoutes: RouteProps[] = [
  {
    path: "/settings",
    getComponent: () => SettingsApp,
    onClientSideRender: () => {
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
        onClientSideRender: () => {
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
        onClientSideRender: () => {
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
        onClientSideRender: () => {
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
        path: "purchases",
        getComponent: () => PurchasesRoute,
        onClientSideRender: () => {
          PurchasesRoute.preload()
        },
        query: graphql`
          query settingsRoutes_PurchasesRouteQuery {
            me {
              ...SettingsPurchasesRoute_me
            }
          }
        `,
      },
      {
        path: "saves",
        render: () => {
          throw new RedirectException(`/favorites/saves`, 301)
        },
      },
      {
        path: "insights",
        getComponent: () => InsightsRoute,
        onClientSideRender: () => {
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
        onClientSideRender: () => {
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
        onClientSideRender: () => {
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
        onClientSideRender: () => {
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
