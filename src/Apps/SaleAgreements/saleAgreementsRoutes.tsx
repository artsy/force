import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"

const SaleAgreementsApp = loadable(
  () => import(/* webpackChunkName: "jobsBundle" */ "./SaleAgreementsApp"),
  {
    resolveComponent: component => component.SaleAgreementsAppFragmentContainer,
  }
)

const SaleAgreementApp = loadable(
  () => import(/* webpackChunkName: "jobsBundle" */ "./SaleAgreementApp"),
  {
    resolveComponent: component => component.SaleAgreementAppFragmentContainer,
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
    getComponent: () => SaleAgreementApp,
    onClientSideRender: () => {
      SaleAgreementApp.preload()
    },
    query: graphql`
      query saleAgreementsRoutes_SaleAgreementQuery($id: ID!) {
        saleAgreement(id: $id) {
          ...SaleAgreementApp_saleAgreement
        }
      }
    `,
  },
]
