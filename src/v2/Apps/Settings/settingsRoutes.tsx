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
        theme: "v3",
        getComponent: () => OverviewRoute,
        prepare: () => {
          OverviewRoute.preload()
        },
      },
      {
        path: "auctions",
        theme: "v3",
        cacheConfig: {
          force: true,
        },
        getComponent: () => AuctionsRoute,
        prepare: () => {
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
        theme: "v3",
        getComponent: () => EditProfileRoute,
        prepare: () => {
          EditProfileRoute.preload()
        },
      },
      {
        path: "payments",
        theme: "v3",
        getComponent: () => PaymentsRoute,
        prepare: () => {
          PaymentsRoute.preload()
        },
      },
      {
        path: "purchases",
        theme: "v3",
        getComponent: () => PurchasesRoute,
        prepare: () => {
          PurchasesRoute.preload()
        },
      },
      {
        path: "saves",
        theme: "v3",
        getComponent: () => SavesRoute,
        prepare: () => {
          SavesRoute.preload()
        },
      },

      {
        path: "edit-settings",
        theme: "v3",
        getComponent: () => SettingsRoute,
        prepare: () => {
          SettingsRoute.preload()
        },
      },

      {
        path: "shipping",
        theme: "v3",
        getComponent: () => ShippingRoute,
        prepare: () => {
          ShippingRoute.preload()
        },
      },
    ],
  },
]
