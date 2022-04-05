import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "v2/System/Router/Route"

const PageApp = loadable(
  () => import(/* webpackChunkName: "buyerBundle" */ "./PageApp"),
  {
    resolveComponent: component => component.PageAppFragmentContainer,
  }
)

export const TOP_LEVEL_PAGE_SLUG_ALLOWLIST = [
  "terms",
  "data-processing-agreement",
  "past-terms",
  "past-terms-10-29-12",
  "privacy",
  "past-privacy",
  "security",
  "conditions-of-sale",
  "auction-info",
  "embed-terms",
  "past-terms-8-5-13",
  "past-privacy-10-29-12",
  "rrf-emerging-curator-competition-official-rules",
  "past-privacy-8-5-13",
  "past-terms-9-26-13",
  "buy-now-feature-faq",
  "identity-verification-faq",
]

const PAGE_ROUTE_CONFIG = {
  getComponent: () => PageApp,
  onClientSideRender: () => {
    PageApp.preload()
  },
  query: graphql`
    query pageRoutes_PageQuery($id: ID!) {
      page(id: $id) @principalField {
        ...PageApp_page
      }
    }
  `,
}

export const pageRoutes: AppRouteConfig[] = [
  {
    path: `/:id(${TOP_LEVEL_PAGE_SLUG_ALLOWLIST.join("|")})`,
    ...PAGE_ROUTE_CONFIG,
  },
  { path: "/page/:id", ...PAGE_ROUTE_CONFIG },
]
