import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { graphql } from "react-relay"

const SaleAgreementsApp = loadable(
  () => import(/* webpackChunkName: "jobsBundle" */ "./SaleAgreementsApp"),
  {
    resolveComponent: component => component.SaleAgreementsApp,
  },
)

const SaleAgreementRoute = loadable(
  () =>
    import(/* webpackChunkName: "jobsBundle" */ "./Routes/SaleAgreementRoute"),
  {
    resolveComponent: component => component.SaleAgreementRoute,
  },
)

export const saleAgreementsRoutes: RouteProps[] = [
  {
    path: "/supplemental-cos",
    getComponent: () => SaleAgreementsApp,
    onPreloadJS: () => {
      SaleAgreementsApp.preload()
    },
    query: graphql`
      query saleAgreementsRoutes_SaleAgreementsAppQuery {
        viewer {
          ...SaleAgreementsApp_viewer
        }
      }
    `,
  },
  {
    path: "/supplemental-cos/:id",
    getComponent: () => SaleAgreementRoute,
    onPreloadJS: () => {
      SaleAgreementRoute.preload()
    },
    query: graphql`
      query saleAgreementsRoutes_SaleAgreementQuery($id: ID!) {
        saleAgreement(id: $id) {
          ...SaleAgreementRoute_saleAgreement
        }
      }
    `,
  },
]
