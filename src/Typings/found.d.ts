import { RouteProps } from "System/Router/Route"
import { Environment } from "react-relay"

/**
 * The typescript types for interfacing between found and found relay are not
 * exact. We used to use patch package for this, but now we just override types
 * in a found typescript file.
 */

declare module "found-relay" {
  class Resolver {
    constructor(environment: Environment)
    resolveElements(match: Match): AsyncGenerator<any[]>
  }
}

declare module "found" {
  interface Matcher {
    matchRoutes: (routes: any, to: string | null | undefined) => any
    routeConfig: RouteProps[]
  }

  interface MatcherResult {
    elements: any[] | undefined | null
  }

  interface RouteRenderArgs {
    resolving: boolean
  }

  interface InitialFarceRouterOptions {
    resolver: FoundRelayResolver
  }
}

// This is needed to conform to the module format, which requires to export something.
export {}
