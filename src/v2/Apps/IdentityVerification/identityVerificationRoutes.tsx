import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"
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

export const identityVerificationRoutes: AppRouteConfig[] = [
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
