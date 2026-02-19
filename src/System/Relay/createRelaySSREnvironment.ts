import { getENV } from "Utils/getENV"
import { getTimeZone } from "Utils/getTimeZone"
import createLogger from "Utils/logger"
import "isomorphic-fetch"
import { getMetaphysicsEndpoint } from "System/Relay/getMetaphysicsEndpoint"
import {
  hasNoCacheParamPresent,
  hasPersonalizedArguments,
  isRequestCacheable,
} from "System/Relay/isRequestCacheable"
import { cacheHeaderMiddleware } from "System/Relay/middleware/cacheHeaderMiddleware"
import { cacheLoggerMiddleware } from "System/Relay/middleware/cacheLoggerMiddleware"
import { isEmpty } from "es-toolkit/compat"
import type { Environment as IEnvironment } from "react-relay"
import type RelayClientSSR from "react-relay-network-modern-ssr/lib/client"
import type RelayServerSSR from "react-relay-network-modern-ssr/lib/server"
import {
  RelayNetworkLayer,
  cacheMiddleware,
  errorMiddleware,
  loggerMiddleware,
  urlMiddleware,
} from "react-relay-network-modern/node8"
import { Environment, type INetwork, RecordSource, Store } from "relay-runtime"
import { metaphysicsErrorHandlerMiddleware } from "./middleware/metaphysicsErrorHandlerMiddleware"
import { metaphysicsExtensionsLoggerMiddleware } from "./middleware/metaphysicsExtensionsLoggerMiddleware"
import { principalFieldErrorHandlerMiddleware } from "./middleware/principalFieldErrorHandlerMiddleware"

const logger = createLogger("System/Relay/createRelaySSREnvironment")

const isServer = typeof window === "undefined"
const isDevelopment = getENV("NODE_ENV") === "development"

// Only log on the client during development
const loggingEnabled = !isServer && isDevelopment

const USER_AGENT = "Reaction/Migration"

interface Config {
  cache?: object
  checkStatus?: boolean
  metaphysicsEndpoint?: string
  relayNetwork?: INetwork
  url?: string
  user?: User | null
  userAgent?: string
}

export interface RelaySSREnvironment extends Environment {
  relaySSRMiddleware: RelayClientSSR | RelayServerSSR
  toggleFetching?: (isFetching) => void
}

export function createRelaySSREnvironment(config: Config = {}) {
  const {
    cache = {},
    checkStatus,
    metaphysicsEndpoint = getMetaphysicsEndpoint(),
    relayNetwork,
    url,
    user,
    userAgent,
  } = config

  /**
   * Load client/server SSR middleware.
   * Note: On the client, the server module is aliased to a stub (see rsbuild.config.ts)
   * to avoid bundling the heavy `graphql` dependency (~1MB).
   */
  const relaySSRMiddleware = isServer
    ? new (require("react-relay-network-modern-ssr/node8/server").default)()
    : new (require("react-relay-network-modern-ssr/node8/client").default)(
        cache,
      )

  relaySSRMiddleware.debug = false

  const headers = {
    "Content-Type": "application/json",
    /**
     * Chrome still doesn’t support setting the `User-Agent` header, but as this
     * isn’t critical information either we’re not going to work around it by
     * adding e.g. a `X-User-Agent` header, for now.
     *
     * See https://bugs.chromium.org/p/chromium/issues/detail?id=571722
     */
    "User-Agent": userAgent ? `${userAgent}; ${USER_AGENT}` : USER_AGENT,
    "x-original-session-id": getENV("SESSION_ID"),
    "x-xapp-token": getENV("ARTSY_XAPP_TOKEN"),
  }

  let timeZone
  try {
    timeZone = getTimeZone()
    headers["X-TIMEZONE"] = timeZone
  } catch (error) {
    logger.warn("Browser does not support i18n API, not setting TZ header.")
  }

  const middlewares = [
    urlMiddleware({
      url: metaphysicsEndpoint,
      headers: req => {
        // Determine if the request is cacheable based on the opt-in `@cacheable` directive.
        // If it is, we don't want to send the user's access token even if they are logged in.
        const isCacheable =
          isRequestCacheable(req) &&
          !hasNoCacheParamPresent(url) &&
          !hasPersonalizedArguments(req.variables)

        // Add authenticated headers only if the request is NOT cacheable,
        // and there's a user, otherwise fallback to standard headers.
        const authenticatedHeaders =
          !!user && !isCacheable
            ? {
                ...headers,
                "X-USER-ID": user && (user.id as string),
                "X-ACCESS-TOKEN": user && (user.accessToken as string),
              }
            : headers

        return authenticatedHeaders
      },
      method: "POST",
    }),
    relaySSRMiddleware.getMiddleware(),
    cacheMiddleware({
      size: Number(getENV("GRAPHQL_CACHE_SIZE")) ?? 2000, // max 2000 requests
      ttl: Number(getENV("GRAPHQL_CACHE_TTL")) ?? 3600000, // 1 hour
      clearOnMutation: true,
      onInit: queryResponseCache => {
        if (!isServer) {
          hydrateCacheFromSSR(queryResponseCache)
        }
      },
    }),
    principalFieldErrorHandlerMiddleware(),
    metaphysicsErrorHandlerMiddleware({ checkStatus }),
    cacheHeaderMiddleware({ url, user }),
    cacheLoggerMiddleware(),
    loggingEnabled && loggerMiddleware(),
    loggingEnabled && metaphysicsExtensionsLoggerMiddleware(),
    loggingEnabled && errorMiddleware({ disableServerMiddlewareTip: true }),
  ]

  // TODO: The `noThrow` option is used since we do our own error handling,
  // and don't want the default behavior of throwing when `result.errors` exists.
  // https://github.com/relay-tools/react-relay-network-modern#advanced-options-2nd-argument-after-middlewares
  // This is still 'experimental' and might be removed.
  const network =
    relayNetwork || new RelayNetworkLayer(middlewares, { noThrow: true })

  const source = new RecordSource()
  const store = new Store(source)

  const environment = new Environment({
    network,
    store,
  }) as RelaySSREnvironment

  environment.relaySSRMiddleware = relaySSRMiddleware

  return environment as IEnvironment & {
    relaySSRMiddleware: RelayClientSSR | RelayServerSSR
  }
}

/**
 * During the client-side rehydration phase take SSR cache and add to Relay's
 * QueryResponseCache, which is used inside of cacheMiddleware.
 *
 * @param cache RelayQueryResponseCache
 */
export function hydrateCacheFromSSR(queryResponseCache) {
  const ssrData = JSON.parse(window.__RELAY_HYDRATION_DATA__ || "{}")

  if (!isEmpty(ssrData)) {
    try {
      ssrData.forEach(request => {
        const [key, json] = request
        const { queryID, variables } = JSON.parse(key)
        queryResponseCache.set(queryID, variables, json) // See: https://facebook.github.io/relay/docs/en/network-layer.html#caching
      })
    } catch (error) {
      logger.error(error)
    }
  }
}
