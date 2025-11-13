import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { graphql } from "react-relay"

const IdentityVerificationApp = loadable(
  () =>
    import(
      /* webpackChunkName: "identityVerificationBundle" */ "./IdentityVerificationApp"
    ),
  {
    resolveComponent: component =>
      component.IdentityVerificationAppFragmentContainer,
  }
)
const Processing = loadable(
  () =>
    import(/* webpackChunkName: "identityVerificationBundle" */ "./Processing"),
  {
    resolveComponent: component => component.Processing,
  }
)
const Error = loadable(
  () => import(/* webpackChunkName: "identityVerificationBundle" */ "./Error"),
  {
    resolveComponent: component => component.Error,
  }
)

export const identityVerificationRoutes: RouteProps[] = [
  {
    path: "/identity-verification/processing",
    getComponent: () => Processing,
    onPreloadJS: () => {
      Processing.preload()
    },
  },
  {
    path: "/identity-verification/error",
    getComponent: () => Error,
    onPreloadJS: () => {
      Error.preload()
    },
  },
  {
    path: "/identity-verification/:id",
    getComponent: () => IdentityVerificationApp,
    onPreloadJS: () => {
      IdentityVerificationApp.preload()
    },
    query: graphql`
      query identityVerificationRoutes_IdentityVerificationAppQuery(
        $id: String!
      ) @raw_response_type {
        identityVerification(id: $id) {
          ...IdentityVerificationApp_identityVerification
        }
      }
    `,
  },
]
