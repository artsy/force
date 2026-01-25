import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { RedirectException } from "found"
import { graphql } from "react-relay"

const ReplaceApp = loadable(
  () => import(/* webpackChunkName: "replaceBundle" */ "./ReplaceApp"),
  {
    resolveComponent: component => component.ReplaceAppFragmentContainer,
  },
)

export const replaceRoutes: RouteProps[] = [
  {
    /*
     * This redirect is for demo purposes only --
     * You can remove this first route altogether
     */
    path: "/replace",
    render: () => {
      throw new RedirectException("/replace/claude-monet")
    },
  },
  {
    path: "/replace/:slug",

    /*
     * How long should we cache the query on the server?
     * Default is .env GRAPHQL_CACHE_TTL
     * See also: src/Apps/serverCacheTTLs.tsx
     */
    // serverCacheTTL: 1000,

    /*
     * Relay config to always force a fetch; use very deliberately!
     * We want caching, but some pages should never be cached.
     */
    // cacheConfig: {
    //   force: true
    // },

    getComponent: () => ReplaceApp,
    onPreloadJS: () => {
      ReplaceApp.preload()
    },

    query: graphql`
      query replaceRoutes_ReplaceQuery($slug: String!) @cacheable {
        artist(id: $slug) @principalField {
          ...ReplaceApp_artist
        }
      }
    `,
  },
]
