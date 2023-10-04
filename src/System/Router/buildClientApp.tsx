import { ComponentType } from "react"

import { Resolver } from "found-relay"
import { ScrollManager } from "found-scroll"
import createInitialFarceRouter from "found/createInitialFarceRouter"
import createRender from "found/createRender"

import {
  BrowserProtocol,
  HashProtocol,
  MemoryProtocol,
  createQueryMiddleware,
} from "farce"

import qs from "qs"

import createLogger from "Utils/logger"
import { getUser } from "Utils/user"
import { createRouteConfig } from "./Utils/createRouteConfig"
import { queryStringParsing } from "./Utils/queryStringParsing"

import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { Boot } from "System/Router/Boot"

import { RouterConfig } from "./"

import { trackingMiddleware } from "System/Analytics/trackingMiddleware"
import { RenderError, RenderPending, RenderReady } from "./RenderStatus"
import { shouldUpdateScroll } from "./Utils/shouldUpdateScroll"
import { buildClientAppContext } from "System/Router/buildClientAppContext"
import { loadingIndicatorMiddleware } from "System/Router/loadingIndicatorMiddleware"

interface Resolve {
  ClientApp: ComponentType<any>
}

const logger = createLogger("Artsy/Router/buildClientApp.tsx")

export function buildClientApp(config: RouterConfig): Promise<Resolve> {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        context = {},
        history = {},
        initialRoute = "/",
        routes = [],
      } = config
      const clientContext = buildClientAppContext(context)

      if (clientContext) {
        const user = getUser(clientContext.user)
        const relayEnvironment = createRelaySSREnvironment({
          cache: JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}"),
          user,
        })

        const getHistoryProtocol = () => {
          switch (history.protocol) {
            case "browser":
              return new BrowserProtocol()
            case "hash":
              return new HashProtocol()
            case "memory":
              return new MemoryProtocol(initialRoute)
            default:
              return new BrowserProtocol()
          }
        }

        const historyMiddlewares = [
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
        ]
        const resolver = new Resolver(relayEnvironment)

        const Renderer = createRender({
          renderError: RenderError,
          renderPending: RenderPending,
          renderReady: RenderReady,
        })

        const Router = await createInitialFarceRouter({
          historyMiddlewares,
          historyOptions: history.options,
          historyProtocol: getHistoryProtocol(),
          matchContext: clientContext,
          render: renderArgs => {
            return (
              <ScrollManager
                renderArgs={renderArgs}
                shouldUpdateScroll={shouldUpdateScroll}
              >
                <Renderer {...renderArgs} />
              </ScrollManager>
            )
          },
          resolver,
          routeConfig: createRouteConfig(routes),
        })

        const ClientApp = () => {
          return (
            <Boot
              context={clientContext}
              user={user}
              relayEnvironment={relayEnvironment}
              routes={routes}
            >
              <Router resolver={resolver} />
            </Boot>
          )
        }

        resolve({
          ClientApp,
        })
      }
    } catch (error) {
      logger.error(error)
      reject(error)
    }
  })
}
