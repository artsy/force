import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { AppRouteConfig } from "v2/System/Router/Route"

const SettingsApp = loadable(
  () => import(/* webpackChunkName: "settingsBundle" */ "./SettingsApp"),
  {
    resolveComponent: component => component.SettingsAppFragmentContainer,
  }
)
const OverviewRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/Overview/SettingsOverviewRoute"
    ),
  {
    resolveComponent: component =>
      component.SettingsOverviewRouteFragmentContainer,
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
const SavesRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/Saves/SettingsSavesRoute"
    ),
  {
    resolveComponent: component =>
      component.SettingsSavesRouteFragmentContainer,
  }
)
const SettingsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/Settings/SettingsEditRoute"
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

export const settingsRoutes: AppRouteConfig[] = [
  {
    path: "/settings2",
    theme: "v3",
    getComponent: () => SettingsApp,
    prepare: () => {
      SettingsApp.preload()
    },
    query: graphql`
      query settingsRoutes_SettingsQuery {
        me {
          ...SettingsApp_me
        }
      }
    `,
    children: [
      {
        path: "/",
        getComponent: () => OverviewRoute,
        prepare: () => {
          OverviewRoute.preload()
        },
      },
      {
        path: "auctions",
        getComponent: () => AuctionsRoute,
        prepare: () => {
          AuctionsRoute.preload()
        },
      },
      {
        path: "edit-profile",
        getComponent: () => EditProfileRoute,
        prepare: () => {
          EditProfileRoute.preload()
        },
      },
      {
        path: "payments",
        getComponent: () => PaymentsRoute,
        prepare: () => {
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
        prepare: () => {
          PurchasesRoute.preload()
        },
      },
      {
        path: "saves",
        getComponent: () => SavesRoute,
        prepare: () => {
          SavesRoute.preload()
        },
      },
      {
        path: "edit-settings",
        getComponent: () => SettingsRoute,
        prepare: () => {
          SettingsRoute.preload()
        },
      },
      {
        path: "shipping",
        getComponent: () => ShippingRoute,
        prepare: () => {
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
