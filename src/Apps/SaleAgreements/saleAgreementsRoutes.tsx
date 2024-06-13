import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router2/Route"

const SaleAgreementsApp = loadable(
  () => import(/* webpackChunkName: "jobsBundle" */ "./SaleAgreementsApp"),
  {
    resolveComponent: component => component.SaleAgreementsApp,
  }
)

const SaleAgreementRoute = loadable(
  () =>
    import(/* webpackChunkName: "jobsBundle" */ "./Routes/SaleAgreementRoute"),
  {
    resolveComponent: component => component.SaleAgreementRoute,
  }
)

export const saleAgreementsRoutes: AppRouteConfig[] = [
  {
    path: "/supplemental-cos",
    getComponent: () => SaleAgreementsApp,
    onClientSideRender: () => {
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
    onClientSideRender: () => {
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
