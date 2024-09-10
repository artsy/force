import { getENV } from "Utils/getENV"
import { getTimeZone } from "Utils/getTimeZone"
import createLogger from "Utils/logger"
import "isomorphic-fetch"
import { isEmpty } from "lodash"
import RelayClientSSR from "react-relay-network-modern-ssr/lib/client"
import RelayServerSSR from "react-relay-network-modern-ssr/lib/server"
import {
  RelayNetworkLayer,
  batchMiddleware,
  cacheMiddleware,
  errorMiddleware,
  loggerMiddleware,
  urlMiddleware,
} from "react-relay-network-modern/node8"
import "regenerator-runtime/runtime"
import { Environment, INetwork, RecordSource, Store } from "relay-runtime"
import { Environment as IEnvironment } from "react-relay"
import { metaphysicsErrorHandlerMiddleware } from "./middleware/metaphysicsErrorHandlerMiddleware"
import { metaphysicsExtensionsLoggerMiddleware } from "./middleware/metaphysicsExtensionsLoggerMiddleware"
import { principalFieldErrorHandlerMiddleware } from "./middleware/principalFieldErrorHandlerMiddleware"
import { searchBarImmediateResolveMiddleware } from "./middleware/searchBarImmediateResolveMiddleware"
import { getMetaphysicsEndpoint } from "System/Relay/getMetaphysicsEndpoint"
import { cacheHeaderMiddleware } from "System/Relay/middleware/cacheHeaderMiddleware"
import { cacheLoggerMiddleware } from "System/Relay/middleware/cacheLoggerMiddleware"

const logger = createLogger("System/Relay/createRelaySSREnvironment")

const isServer = typeof window === "undefined"
const isDevelopment = getENV("NODE_ENV") === "development"

// Only log on the client during development
const loggingEnabled =
  !isServer && (isDevelopment || window.artsy.isLoggerEnabled)

const USER_AGENT = `Reaction/Migration`

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
   * Lazy load these here so we can safely ignore the server module from client
   * bundles without that leading to an exception trying to import it
   * unconditionally at the top-level.
   */
  const relaySSRMiddleware = isServer
    ? new (require("react-relay-network-modern-ssr/node8/server").default)()
    : new (require("react-relay-network-modern-ssr/node8/client").default)(
        cache
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
  }

  let timeZone
  try {
    timeZone = getTimeZone()
    headers["X-TIMEZONE"] = timeZone
  } catch (error) {
    logger.warn("Browser does not support i18n API, not setting TZ header.")
  }

  const authenticatedHeaders = !!user
    ? {
        ...headers,
        "X-USER-ID": user && (user.id as string),
        "X-ACCESS-TOKEN": user && (user.accessToken as string),
      }
    : headers

  const middlewares = [
    searchBarImmediateResolveMiddleware(),
    urlMiddleware({
      url: metaphysicsEndpoint,
      headers: authenticatedHeaders,
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

    ...(getENV("ENABLE_QUERY_BATCHING")
      ? [
          batchMiddleware({
            headers: authenticatedHeaders,
            batchUrl: `${getENV("METAPHYSICS_ENDPOINT")}/v2/batch`,
            // Period of time (integer in milliseconds) for gathering multiple requests
            // before sending them to the server.
            // Will delay sending of the requests on specified in this option period of time,
            // so be careful and keep this value small. (default: 0)
            batchTimeout: 0,
          }),
        ]
      : []),
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
  const ssrData = JSON.parse(window.__RELAY_BOOTSTRAP__ || "{}")

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
