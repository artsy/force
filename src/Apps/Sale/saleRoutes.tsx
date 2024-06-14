import loadable from "@loadable/component"
import { getArtworkFilterInputArgs } from "Apps/Sale/Components/SaleArtworks"
import { getInitialFilterState } from "Components/ArtworkFilter/Utils/getInitialFilterState"
import { RouteProps } from "System/Router/Route"
import { RedirectException } from "found"
import { graphql } from "react-relay"

const SaleApp = loadable(
  () => import(/* webpackChunkName: "saleBundle" */ "./SaleApp"),
  {
    resolveComponent: component => component.SaleAppFragmentContainer,
  }
)

export const saleRoutes: RouteProps[] = [
  {
    path: "/sale/:slug",
    getComponent: () => SaleApp,
    onClientSideRender: () => {
      SaleApp.preload()
    },
    query: graphql`
      query saleRoutes_SaleQuery($input: FilterArtworksInput, $slug: String!) {
        sale(id: $slug) @principalField {
          ...SaleApp_sale

          isAuction
        }
        viewer {
          ...SaleApp_viewer @arguments(input: $input)
        }
      }
    `,
    prepareVariables: (params, props) => {
      const saleFilterDefaults = {
        sort: "sale_position",
      }

      const initialFilterStateFromUrl = getInitialFilterState(
        props.location?.query ?? {}
      )

      const userSpecificFilterState = getArtworkFilterInputArgs(
        props.context.user
      )

      const variables = {
        slug: params.slug,
        input: {
          ...saleFilterDefaults,
          ...initialFilterStateFromUrl,
          ...userSpecificFilterState,
          saleID: params.slug,
        },
      }

      return variables
    },
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
