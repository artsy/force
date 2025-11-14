import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

const PageApp = loadable(
  () => import(/* webpackChunkName: "pageBundle" */ "./PageApp"),
  {
    resolveComponent: component => component.PageAppFragmentContainer,
  },
)

export const TOP_LEVEL_PAGE_SLUG_ALLOWLIST = [
  "artsy-accessibility-statement",
  "auction-info",
  "buy-now-feature-faq",
  "conditions-of-sale",
  "data-processing-agreement",
  "embed-terms",
  "identity-verification-faq",
  "past-privacy-10-29-12",
  "past-privacy-8-5-13",
  "past-privacy",
  "past-terms-10-29-12",
  "past-terms-8-5-13",
  "past-terms-9-26-13",
  "past-terms",
  "privacy",
  "private-sales-conditions-of-sale",
  "rrf-emerging-curator-competition-official-rules",
  "security",
  "terms",
]

export const PAGE_SLUGS_WITH_AUTH_REQUIRED = [
  "private-sales-conditions-of-sale",
]

const PAGE_ROUTE_CONFIG = {
  getComponent: () => PageApp,
  onPreloadJS: () => {
    PageApp.preload()
  },
  query: graphql`
    query pageRoutes_PageQuery($id: ID!) @cacheable {
      page(id: $id) @principalField {
        ...PageApp_page
      }
    }
  `,
}

export const pageRoutes: RouteProps[] = [
  {
    path: `/:id(${TOP_LEVEL_PAGE_SLUG_ALLOWLIST.join("|")})`,
    ...PAGE_ROUTE_CONFIG,
  },
  { path: "/page/:id", ...PAGE_ROUTE_CONFIG },
]
