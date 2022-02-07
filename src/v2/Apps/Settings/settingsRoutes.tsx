import loadable from "@loadable/component"
import { graphql } from "relay-runtime"
import { AppRouteConfig } from "v2/System/Router/Route"

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
    resolveComponent: component => component.DeleteAccountRoute,
  }
)

// Redirect home if the user is not logged in
const handleServerSideRender = ({ req, res }) => {
  if (!req.user) {
    res.redirect("/")
  }
}

const SavedSearchAlertsApp = loadable(
  () =>
    import(
      /* webpackChunkName: "settingsBundle" */ "./Routes/SavedSearchAlerts/SavedSearchAlertsApp"
    ),
  {
    resolveComponent: component =>
      component.SavedSearchAlertsAppPaginationContainer,
  }
)

export const settingsRoutes: AppRouteConfig[] = [
  {
    path: "/settings",
    theme: "v3",
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
        onServerSideRender: handleServerSideRender,
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
        onServerSideRender: handleServerSideRender,
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
        onServerSideRender: handleServerSideRender,
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
        onServerSideRender: handleServerSideRender,
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
        getComponent: () => SavesRoute,
        onClientSideRender: () => {
          SavesRoute.preload()
        },
        onServerSideRender: handleServerSideRender,
        query: graphql`
          query settingsRoutes_SavesRouteQuery {
            me {
              ...SettingsSavesRoute_me
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
        onServerSideRender: handleServerSideRender,
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
        onServerSideRender: handleServerSideRender,
      },
      {
        path: "shipping",
        getComponent: () => ShippingRoute,
        onClientSideRender: () => {
          ShippingRoute.preload()
        },
        onServerSideRender: handleServerSideRender,
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

  {
    path: "/user/alerts",
    theme: "v3",
    getComponent: () => SavedSearchAlertsApp,
    onClientSideRender: () => {
      SavedSearchAlertsApp.preload()
    },
    query: graphql`
      query settingsRoutes_SavedSearchAlertsQuery {
        me {
          ...SavedSearchAlertsApp_me
        }
      }
    `,
  },
]
