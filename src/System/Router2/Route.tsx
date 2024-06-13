import { SystemContextProps } from "System/SystemContext"
import { Location, Params, ForceRouteObjectBase } from "found"
import { GraphQLTaggedNode } from "react-relay"
import { CacheConfig } from "relay-runtime"

export interface Route extends ForceRouteObjectBase {
  prepareVariables?: (params: any, props: PrepareVariablesProps) => object
  query?: GraphQLTaggedNode
  cacheConfig?: CacheConfig
}

interface PrepareVariablesProps {
  context: SystemContextProps
  location: Location
  params: Params
  route: Route
}
