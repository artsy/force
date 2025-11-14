import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { graphql } from "react-relay"

const FavoritesApp = loadable(
  () =>
    import(/* webpackChunkName: "collectorProfileBundle" */ "./FavoritesApp"),
  { resolveComponent: component => component.FavoritesApp },
)

const Saves = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/FavoritesSaves"
    ),
  { resolveComponent: component => component.FavoritesSavesFragmentContainer },
)

const Follows = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/FavoritesFollows/FavoritesFollows"
    ),
  { resolveComponent: component => component.FavoritesFollows },
)

const Alerts = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/FavoritesAlerts"
    ),
  {
    resolveComponent: component => component.FavoritesAlertsPaginationContainer,
  },
)

export const favoritesRoutes: RouteProps[] = [
  {
    path: "/favorites",
    getComponent: () => FavoritesApp,
    onPreloadJS: () => {
      FavoritesApp.preload()
    },
    children: [
      {
        path: "saves/:id?",
        ignoreScrollBehavior: true,
        getComponent: () => Saves,
        onPreloadJS: () => {
          Saves.preload()
        },
        query: graphql`
          query favoritesRoutes_SavesRouteQuery {
            me {
              ...CollectorProfileSavesRoute_me
            }
          }
        `,
      },
      {
        path: "follows",
        getComponent: () => Follows,
        onPreloadJS: () => {
          Follows.preload()
        },
      },
      {
        path: "alerts",
        getComponent: () => Alerts,
        layout: "NavOnly",
        onPreloadJS: () => {
          Alerts.preload()
        },
        query: graphql`
          query favoritesRoutesAlertsAppQuery {
            me {
              ...SavedSearchAlertsApp_me
            }
          }
        `,
      },
      {
        path: "alerts/:alertID/edit",
        getComponent: () => Alerts,
        layout: "NavOnly",

        onPreloadJS: () => {
          Alerts.preload()
        },
        query: graphql`
          query favoritesRoutesAlertsAppEditQuery {
            me {
              ...SavedSearchAlertsApp_me
            }
          }
        `,
      },
      {
        path: "alerts/:alertID/artworks",
        layout: "NavOnly",

        getComponent: () => Alerts,
        onPreloadJS: () => {
          Alerts.preload()
        },
        query: graphql`
          query favoritesRoutesAlertsArtworksQuery {
            me {
              ...SavedSearchAlertsApp_me
            }
          }
        `,
      },
    ],
  },
]
