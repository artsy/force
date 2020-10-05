import loadable from "@loadable/component"
import { RouteConfig } from "found"
import { graphql } from "react-relay"

const IdentityVerificationApp = loadable(() =>
  import("./IdentityVerificationApp")
)
const Processing = loadable(() => import("./Processing"))
const Error = loadable(() => import("./Error"))

export const routes: RouteConfig[] = [
  {
    path: "/identity-verification/processing",
    getComponent: () => Processing,
    prepare: () => {
      Processing.preload()
    },
  },
  {
    path: "/identity-verification/error",
    getComponent: () => Error,
    prepare: () => {
      Error.preload()
    },
  },
  {
    path: "/identity-verification/:id",
    getComponent: () => IdentityVerificationApp,
    prepare: () => {
      IdentityVerificationApp.preload()
    },
    query: graphql`
      query routes_IdentityVerificationAppQuery($id: String!)
        @raw_response_type {
        me {
          ...IdentityVerificationApp_me @arguments(id: $id)
        }
      }
    `,
  },
]
