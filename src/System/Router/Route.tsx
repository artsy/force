import { LayoutVariant } from "Apps/Components/Layouts"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import { ClientContext } from "System/Router/Utils/clientAppContext"
import { RemoveIndex } from "Utils/typeSupport"
import { NextFunction } from "express"
import { Location, Match, RouteObjectBase } from "found"
import { GraphQLTaggedNode } from "react-relay"
import { CacheConfig } from "relay-runtime"

export type AppRouteConfig = RemoveIndex<RouteConfigProps>

export interface RouteConfigProps extends RouteObjectBase {
  cacheConfig?: CacheConfig
  getCacheConfig?: (props: {
    context: ClientContext
    location: Location
    params: {
      [key: string]: string | undefined
    }
  }) => CacheConfig
  children?: AppRouteConfig[]
  ignoreScrollBehavior?: boolean
  ignoreScrollBehaviorBetweenChildren?: boolean
  layout?: LayoutVariant
  onClientSideRender?: (props: { match: Match }) => void
  onServerSideRender?: (props: {
    req: ArtsyRequest
    res: ArtsyResponse
    next: NextFunction
    route: AppRouteConfig
  }) => void
  prepareVariables?: (params: any, props: any) => object
  query?: GraphQLTaggedNode
  scrollToTop?: boolean
  shouldWarnBeforeLeaving?: boolean
}
