import type { LayoutVariant } from "Apps/Components/Layouts"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import type { ClientContext } from "System/Router/Utils/clientAppContext"
import type { RemoveIndex } from "Utils/typeSupport"
import type { NextFunction } from "express"
import type { Location, Match, RouteObjectBase } from "found"
import type { FetchPolicy, GraphQLTaggedNode } from "react-relay"
import type { CacheConfig } from "relay-runtime"

interface Route extends RouteObjectBase {
  children?: RouteProps[]
  ignoreScrollBehavior?: boolean
  ignoreScrollBehaviorBetweenChildren?: boolean
  layout?: LayoutVariant

  prepareVariables?: (params: any, props: any) => object
  query?: GraphQLTaggedNode
  /**
   * If there are any queries in the route we'd like to prefetch (in order to
   * warm the cache), declare them here.
   *
   * Currently only supported on hover. See RouterLink.tsx for usage.
  ) */
  prefetchSubQueries?: GraphQLTaggedNode[]
  scrollToTop?: boolean
  shouldWarnBeforeLeaving?: boolean

  /**
   * Render hooks
   */

  onPreloadJS?: () => void
  onClientSideRender?: (props: { match: Match }) => void
  onServerSideRender?: (props: {
    req: ArtsyRequest
    res: ArtsyResponse
    next: NextFunction
    route: RouteProps
  }) => void

  /**
   * Cache configuration
   */

  /** Configures how long the server should cache the response */
  serverCacheTTL?: number
  /** Relay fetch policy; use store-and-network to cache and then refetch */
  fetchPolicy?: FetchPolicy
  /** Relay cache config; use { force: true } to always refetch */
  cacheConfig?: CacheConfig
  getCacheConfig?: (props: {
    context: ClientContext
    location: Location
    params: {
      [key: string]: string | undefined
    }
  }) => CacheConfig
}

export type RouteProps = RemoveIndex<Route>
