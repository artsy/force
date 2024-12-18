import loadable from "@loadable/component"
import { graphql } from "react-relay"
import type { RouteProps } from "System/Router/Route"

const GalleriesRoute = loadable(
  () =>
    import(/* webpackChunkName: "partnersBundle" */ "./Routes/GalleriesRoute"),
  { resolveComponent: component => component.GalleriesRouteFragmentContainer }
)

const InstitutionsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "partnersBundle" */ "./Routes/InstitutionsRoute"
    ),
  {
    resolveComponent: component => component.InstitutionsRouteFragmentContainer,
  }
)

export const partnersRoutes: RouteProps[] = [
  {
    path: "/galleries",
    getComponent: () => GalleriesRoute,
    onPreloadJS: () => {
      return GalleriesRoute.preload()
    },
    query: graphql`
      query partnersRoutes_GalleriesRouteQuery @cacheable {
        viewer {
          ...GalleriesRoute_viewer
        }
      }
    `,
  },
  {
    path: "/institutions",
    getComponent: () => InstitutionsRoute,
    onPreloadJS: () => {
      return InstitutionsRoute.preload()
    },
    query: graphql`
      query partnersRoutes_InstitutionsRouteQuery @cacheable {
        viewer {
          ...InstitutionsRoute_viewer
        }
      }
    `,
  },
]
