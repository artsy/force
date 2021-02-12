import loadable from "@loadable/component"
import { RouteConfig } from "found"
import { graphql } from "react-relay"

const IdentityVerificationApp = loadable(
  () => import("./IdentityVerificationApp"),
  {
    resolveComponent: component =>
      component.IdentityVerificationAppFragmentContainer,
  }
)
const Processing = loadable(() => import("./Processing"), {
  resolveComponent: component => component.Processing,
})
const Error = loadable(() => import("./Error"), {
  resolveComponent: component => component.Error,
})

export const identityVerificationRoutes: RouteConfig[] = [
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
      query identityVerificationRoutes_IdentityVerificationAppQuery(
        $id: String!
      ) @raw_response_type {
        me {
          ...IdentityVerificationApp_me @arguments(id: $id)
        }
      }
    `,
  },
]
