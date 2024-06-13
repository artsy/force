import {
  BrowserProtocol,
  HistoryEnhancerOptions,
  createQueryMiddleware,
} from "farce"
import { Resolver } from "found-relay"
import { createFarceRouter, createRender } from "found"
import { ScrollManager, ScrollManagerProps } from "found-scroll"
import { SystemContextProps } from "System/SystemContext"
import { renderStates } from "System/Router2/RenderStates"
import { queryStringParsing } from "System/Router/Utils/queryStringParsing"
import { loadingIndicatorMiddleware } from "System/Router/loadingIndicatorMiddleware"
import { trackingMiddleware } from "System/Analytics/trackingMiddleware"
import qs from "qs"
import { shouldUpdateScroll } from "System/Router/Utils/shouldUpdateScroll"
import { Environment } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"
import { FeatureFlags } from "System/useFeatureFlag"
import { buildClientAppContext } from "System/Router/buildClientAppContext"
import { getUser } from "Utils/user"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { Boot } from "System/Router/Boot"

export interface RouterConfig {
  context?: SystemContextProps & { relayEnvironment?: Environment }
  featureFlags?: FeatureFlags
  history?: {
    protocol?: "browser" | "hash" | "memory"
    options?: HistoryEnhancerOptions
  }
  initialRoute?: string
  routes: AppRouteConfig[]
  url?: string
}

export const setupClientRouter = (config: RouterConfig) => {
  const matchContext = buildClientAppContext(config.context)

  const user = getUser(matchContext.user)

  const relayEnvironment = createRelaySSREnvironment({
    cache: JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}"),
    user,
  })

  const resolver = new Resolver(relayEnvironment)

  const render = createRender(renderStates)

  const middleware = [
    loadingIndicatorMiddleware(),
    createQueryMiddleware({
      parse: queryStringParsing,
      stringify: qs.stringify,
    }),
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

  const Router = createFarceRouter({
    historyProtocol: new BrowserProtocol(),
    historyMiddlewares: middleware,
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

  const ClientRouter = () => {
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
