import { LayoutVariant } from "Apps/Components/Layouts"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import { ClientContext } from "System/Router/Utils/clientAppContext"
import { RemoveIndex } from "Utils/typeSupport"
import { NextFunction } from "express"
import { Location, Match, RouteObjectBase } from "found"
import { FetchPolicy, GraphQLTaggedNode } from "react-relay"
import { CacheConfig } from "relay-runtime"

interface Route extends RouteObjectBase {
  children?: RouteProps[]
  ignoreScrollBehavior?: boolean
  ignoreScrollBehaviorBetweenChildren?: boolean
  layout?: LayoutVariant

  prepareVariables?: (params: any, props: any) => object
  query?: GraphQLTaggedNode
  scrollToTop?: boolean
  shouldWarnBeforeLeaving?: boolean

  /**
   * Render hooks
   */

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

  /** Configures how long the server should cache the response in Redis */
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
