import {
  BrowserProtocol,
  HashProtocol,
  HistoryEnhancerOptions,
  MemoryProtocol,
  createQueryMiddleware,
} from "farce"
import { Resolver } from "found-relay"
import { createFarceRouter, createRender } from "found"
import { ScrollManager, ScrollManagerProps } from "found-scroll"
import { renderStates } from "System/Router/RenderStates"
import { Environment } from "react-relay"
import { RouteProps } from "System/Router/Route"
import { FeatureFlags } from "System/Hooks/useFeatureFlag"
import { getUser } from "Utils/user"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import qs from "qs"
import { getClientAppContext } from "System/Router/Utils/clientAppContext"
import { queryStringParsing } from "System/Router/Utils/queryStringParsing"
import { shouldUpdateScroll } from "System/Router/Utils/shouldUpdateScroll"
import { Boot } from "System/Boot"
import { SystemContextProps } from "System/Contexts/SystemContext"
import { loadingIndicatorMiddleware } from "System/Router/Middleware/loadingIndicatorMiddleware"
import { trackingMiddleware } from "System/Router/Middleware/trackingMiddleware"

export interface RouterConfig {
  context?: SystemContextProps & { relayEnvironment?: Environment }
  featureFlags?: FeatureFlags
  history?: {
    protocol?: "browser" | "hash" | "memory"
    options?: HistoryEnhancerOptions
  }
  initialRoute?: string
  routes: RouteProps[]
  url?: string
}

export const setupClientRouter = (config: RouterConfig) => {
  const matchContext = getClientAppContext(config.context)

  const user = getUser(matchContext.user)

  const relayEnvironment = createRelaySSREnvironment({
    cache: JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}"),
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

  const Router = createFarceRouter({
    historyProtocol,
    historyMiddlewares,
    routeConfig: config.routes,
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

  const ClientRouter: React.FC = () => {
    return (
      <Boot
        context={matchContext}
        user={user}
        relayEnvironment={relayEnvironment}
        routes={config.routes}
      >
        <Router resolver={resolver} matchContext={matchContext} />
      </Boot>
    )
  }

  return { ClientRouter }
}
