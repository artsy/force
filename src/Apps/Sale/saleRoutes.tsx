import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"
import { RedirectException } from "found"
import { graphql } from "react-relay"

const SaleApp = loadable(
  () => import(/* webpackChunkName: "saleBundle" */ "./SaleApp"),
  {
    resolveComponent: component => component.SaleAppFragmentContainer,
  }
)

export const saleRoutes: AppRouteConfig[] = [
  {
    path: "/sale/:slug",
    getComponent: () => SaleApp,
    onClientSideRender: () => {
      SaleApp.preload()
    },
    query: graphql`
      query saleRoutes_SaleQuery($slug: String!) {
        sale(id: $slug) @principalField {
          ...SaleApp_sale

          isAuction
        }
      }
    `,
    render: ({
      Component,
      props,
      match: {
        params: { slug },
      },
    }) => {
      if (!(Component && props)) {
        return undefined
      }

      const isAuction = (props as any).sale.isAuction

      if (!isAuction) {
        return <Component {...props} />
      } else {
        throw new RedirectException(`/auction/${slug}`)
      }
    },
  },
]
