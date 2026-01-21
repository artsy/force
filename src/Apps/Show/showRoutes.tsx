import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { canonicalSlugRedirect } from "System/Router/Utils/canonicalSlugRedirect"
import { RedirectException } from "found"
import { graphql } from "react-relay"

const showWithCanonicalSlugRedirect = canonicalSlugRedirect({
  entityName: "show",
  paramName: "slug",
  basePath: "/show",
})

const ShowApp = loadable(
  () => import(/* webpackChunkName: "showBundle" */ "./ShowApp"),
  {
    resolveComponent: component => component.ShowAppFragmentContainer,
  },
)
const ShowSubApp = loadable(
  () => import(/* webpackChunkName: "showBundle" */ "./ShowSubApp"),
  {
    resolveComponent: component => component.ShowSubAppFragmentContainer,
  },
)
const ShowInfoRoute = loadable(
  () => import(/* webpackChunkName: "showBundle" */ "./Routes/ShowInfo"),
  {
    resolveComponent: component => component.ShowInfoFragmentContainer,
  },
)

export const showRoutes: RouteProps[] = [
  {
    getComponent: () => ShowApp,
    path: "/show/:slug",
    onPreloadJS: () => {
      ShowApp.preload()
    },
    render: showWithCanonicalSlugRedirect,
    query: graphql`
      query showRoutes_ShowQuery($slug: String!) {
        show(id: $slug) @principalField {
          slug
          ...ShowApp_show
        }
      }
    `,
  },
  // NOTE: Nested sub-apps are mounted under the same top-level path as above.
  // The root `path: ""` matches the `ShowApp` route.
  {
    children: [
      {
        getComponent: () => ShowInfoRoute,
        path: "info",
        onPreloadJS: () => {
          ShowInfoRoute.preload()
        },
        query: graphql`
          query showRoutes_ShowInfoQuery($slug: String!) {
            show(id: $slug) @principalField {
              ...ShowInfo_show
            }
          }
        `,
      },
      {
        path: "hours",
        render: props => {
          throw new RedirectException(`/show/${props.match.params.slug}`, 302)
        },
      },
    ],
    getComponent: () => ShowSubApp,
    path: "/show/:slug",
    onPreloadJS: () => {
      ShowSubApp.preload()
    },
    render: showWithCanonicalSlugRedirect,
    query: graphql`
      query showRoutes_ShowSubAppQuery($slug: String!) {
        show(id: $slug) @principalField {
          slug
          ...ShowSubApp_show
        }
      }
    `,
  },
]
