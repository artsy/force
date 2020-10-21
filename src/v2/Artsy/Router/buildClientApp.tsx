import React, { ComponentType } from "react"

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

import createLogger from "v2/Utils/logger"
import { getUser } from "v2/Utils/user"
import { createRouteConfig } from "./Utils/createRouteConfig"
import { queryStringParsing } from "./Utils/queryStringParsing"

import { createRelaySSREnvironment } from "v2/Artsy/Relay/createRelaySSREnvironment"
import { Boot } from "v2/Artsy/Router/Boot"

import { RouterConfig } from "./"

import { trackingMiddleware } from "v2/Artsy/Analytics/trackingMiddleware"
import { RenderError, RenderPending, RenderReady } from "./RenderStatus"
import { shouldUpdateScroll } from "./Utils/shouldUpdateScroll"
import { buildClientAppContext } from "desktop/lib/buildClientAppContext"

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
        createQueryMiddleware({
          parse: queryStringParsing,
          stringify: qs.stringify,
        }),
        trackingMiddleware({
          excludePaths: ["/artwork(.*)"],
        }),
      ]
      const resolver = new Resolver(relayEnvironment)

      const Renderer = createRender({
        renderPending: RenderPending,
        renderReady: RenderReady,
        renderError: RenderError,
      })

      const Router = await createInitialFarceRouter({
        historyProtocol: getHistoryProtocol(),
        historyMiddlewares,
        historyOptions: history.options,
        routeConfig: createRouteConfig(routes),
        matchContext: context,
        resolver,
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
    } catch (error) {
      logger.error(error)
      reject(error)
    }
  })
}
