import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { RouteProps } from "System/Router/Route"

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
    onClientSideRender: () => {
      return GalleriesRoute.preload()
    },
    query: graphql`
      query partnersRoutes_GalleriesRouteQuery {
        viewer {
          ...GalleriesRoute_viewer
        }
      }
    `,
  },
  {
    path: "/institutions",
    getComponent: () => InstitutionsRoute,
    onClientSideRender: () => {
      return InstitutionsRoute.preload()
    },
    query: graphql`
      query partnersRoutes_InstitutionsRouteQuery {
        viewer {
          ...InstitutionsRoute_viewer
        }
      }
    `,
  },
]
