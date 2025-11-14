import { Boot } from "System/Boot"
import type { SystemContextProps } from "System/Contexts/SystemContext"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { loadingIndicatorMiddleware } from "System/Router/Middleware/loadingIndicatorMiddleware"
import { trackingMiddleware } from "System/Router/Middleware/trackingMiddleware"
import { renderStates } from "System/Router/RenderStates"
import type { RouteProps } from "System/Router/Route"
import { getClientAppContext } from "System/Router/Utils/clientAppContext"
import { queryStringParsing } from "System/Router/Utils/queryStringParsing"
import { shouldUpdateScroll } from "System/Router/Utils/shouldUpdateScroll"
import { getUser } from "Utils/user"
import {
  BrowserProtocol,
  createQueryMiddleware,
  HashProtocol,
  type HistoryEnhancerOptions,
  MemoryProtocol,
} from "farce"
import { createInitialFarceRouter, createRender } from "found"
import { Resolver } from "found-relay"
import { ScrollManager, type ScrollManagerProps } from "found-scroll"
import qs from "qs"
import React from "react"

export interface RouterConfig {
  context?: Partial<SystemContextProps>
  history?: {
    protocol?: "browser" | "hash" | "memory"
    options?: HistoryEnhancerOptions
  }
  initialRoute?: string
  routes: RouteProps[]
  url?: string
}

export const setupClientRouter = async (
  config: RouterConfig,
): Promise<{
  ClientRouter: React.ComponentType<any>
}> => {
  const matchContext = getClientAppContext(config.context)

  const user = getUser(matchContext.user)

  const relayEnvironment = createRelaySSREnvironment({
    cache: JSON.parse(window.__RELAY_HYDRATION_DATA__ || "{}"),
    user,
  })

  const resolver = new Resolver(relayEnvironment)

  const render = createRender(renderStates)

  const historyMiddlewares = [
    loadingIndicatorMiddleware(),
    trackingMiddleware({
      excludePaths: [
        // Due to special needs, this page has its own page-view tracking implementation.
        // @see https://github.com/artsy/force/blob/2c0db041fa6cb50e9f747ea95860ad5c38290653/src/Apps/Artwork/ArtworkApp.tsx#L117-L121
        "/artwork(.*)",
      ],
      excludeReferrers: ["/\\?(.*)onboarding=true(.*)"],
    }),
    createQueryMiddleware({
      parse: queryStringParsing,
      stringify: qs.stringify,
    }),
  ]

  const historyProtocol = (() => {
    switch (config.history?.protocol) {
      case "browser":
        return new BrowserProtocol()
      case "hash":
        return new HashProtocol()
      case "memory":
        return new MemoryProtocol(config.initialRoute ?? "")
      default:
        return new BrowserProtocol()
    }
  })()

  const BrowserRouter = await createInitialFarceRouter({
    routeConfig: config.routes,
    historyProtocol,
    historyMiddlewares,
    resolver,
    matchContext,
    render: renderArgs => {
      return (
        <ScrollManager
          renderArgs={renderArgs as any}
          shouldUpdateScroll={
            shouldUpdateScroll as ScrollManagerProps["shouldUpdateScroll"]
          }
        >
          {render(renderArgs)}
        </ScrollManager>
      )
    },
  })

  const ClientRouter: React.FC<React.PropsWithChildren<unknown>> = React.memo(
    () => {
      return (
        <Boot
          context={matchContext}
          user={user}
          relayEnvironment={relayEnvironment}
          routes={config.routes}
        >
          <BrowserRouter resolver={resolver} />
        </Boot>
      )
    },
  )

  return { ClientRouter }
}
