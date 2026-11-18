import loadable from "@loadable/component"
import { C2C_SELLER_PAYMENTS_FLAG } from "Apps/CollectorProfile/Utils/featureFlags"
import type { SystemContextProps } from "System/Contexts/SystemContext"
import type { RouteProps } from "System/Router/Route"
import { RedirectException } from "found"
import { graphql } from "react-relay"

const CollectorProfileApp = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./CollectorProfileApp"
    ),
  {
    resolveComponent: component =>
      component.CollectorProfileAppFragmentContainer,
  },
)

const MyCollectionRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/MyCollection/CollectorProfileMyCollectionRoute"
    ),
  {
    resolveComponent: component =>
      component.CollectorProfileMyCollectionRoutePaginationContainer,
  },
)

const InsightsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/Insights/CollectorProfileInsightsRoute"
    ),
  {
    resolveComponent: component =>
      component.CollectorProfileInsightsRouteFragmentContainer,
  },
)

const MyCollectionCreateArtwork = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/MyCollection/EditArtwork/MyCollectionCreateArtwork"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionCreateArtworkFragmentContainer,
  },
)

const MyCollectionArtwork = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/MyCollection/MyCollectionArtwork/MyCollectionArtwork"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionArtworkFragmentContainer,
  },
)

const MyCollectionEditArtwork = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/MyCollection/EditArtwork/MyCollectionEditArtwork"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionEditArtworkFragmentContainer,
  },
)

const Artists = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/Artists/CollectorProfileArtistsRoute"
    ),
  {
    resolveComponent: component => component.CollectorProfileArtistsRoute,
  },
)

const Sales = loadable(
  () =>
    import(
      /* webpackChunkName: "collectorProfileBundle" */ "./Routes/Sales/CollectorProfileSalesRoute"
    ),
  {
    resolveComponent: component => component.CollectorProfileSalesRoute,
  },
)

// Redirect home if the user is not logged in
const handleServerSideRender = () => {
  // TODO: Redirect to the logged out experience once released
}

export const collectorProfileRoutes: RouteProps[] = [
  {
    path: "/collector-profile",
    getComponent: () => CollectorProfileApp,
    onPreloadJS: () => {
      CollectorProfileApp.preload()
    },
    query: graphql`
      query collectorProfileRoutes_CollectorProfileQuery {
        me {
          ...CollectorProfileApp_me
        }
      }
    `,
    children: [
      {
        path: "artists",
        getComponent: () => Artists,
        onPreloadJS: () => {
          Artists.preload()
        },
      },
      {
        path: "sales",
        getComponent: () => Sales,
        render: ({ Component, props, match }) => {
          const { featureFlags } = match.context as SystemContextProps

          if (!featureFlags?.isEnabled(C2C_SELLER_PAYMENTS_FLAG)) {
            throw new RedirectException("/collector-profile", 302)
          }

          if (!Component) {
            return undefined
          }

          return <Component {...props} />
        },
        onPreloadJS: () => {
          Sales.preload()
        },
      },
      {
        path: "my-collection",
        getComponent: () => MyCollectionRoute,
        onPreloadJS: () => {
          MyCollectionRoute.preload()
        },
        query: graphql`
          query collectorProfileRoutes_MyCollectionRouteQuery {
            me {
              ...MyCollectionRoute_me
            }
          }
        `,
        cacheConfig: { force: true },
      },
      {
        path: "insights",
        getComponent: () => InsightsRoute,
        onPreloadJS: () => {
          InsightsRoute.preload()
        },
        onServerSideRender: handleServerSideRender,
        query: graphql`
          query collectorProfileRoutes_InsightsRouteQuery {
            me {
              ...InsightsRoute_me
            }
          }
        `,
      },
    ],
  },
  {
    path: "/collector-profile/my-collection/artworks/new",
    layout: "ContainerOnly",
    getComponent: () => MyCollectionCreateArtwork,
    onPreloadJS: () => {
      MyCollectionCreateArtwork.preload()
    },
    query: graphql`
      query collectorProfileRoutes_MyCollectionArtworkUploadQuery {
        me {
          ...MyCollectionCreateArtwork_me
        }
      }
    `,
  },
  {
    path: "/collector-profile/my-collection/artwork/:artworkID",
    getComponent: () => MyCollectionArtwork,
    onPreloadJS: () => {
      MyCollectionArtwork.preload()
    },
    query: graphql`
      query collectorProfileRoutes_ArtworkQuery($artworkID: String!) {
        artwork(id: $artworkID) @principalField {
          ...MyCollectionArtwork_artwork
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
  {
    path: "/collector-profile/my-collection/artworks/:slug/edit",
    layout: "ContainerOnly",
    getComponent: () => MyCollectionEditArtwork,
    onPreloadJS: () => {
      MyCollectionEditArtwork.preload()
    },
    query: graphql`
      query collectorProfileRoutes_MyCollectionArtworkFormQuery(
        $slug: String!
      ) {
        artwork(id: $slug) {
          ...MyCollectionEditArtwork_artwork
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
  },
]
