import { graphql } from "react-relay"

// @ts-ignore
import { RouteConfig } from "found"
import { PurchaseAppFragmentContainer as PurchaseApp } from "./PurchaseApp"

export const routes: RouteConfig[] = [
  {
    path: "/user/purchases",
    Component: PurchaseApp,
    query: graphql`
      query routes_PurchaseQuery {
        me {
          ...PurchaseApp_me
        }
      }
    `,
    prepareVariables: (params, props) => {
      return {
        first: 10,
      }
    },
    cacheConfig: {
      force: true,
    },
  },
]
