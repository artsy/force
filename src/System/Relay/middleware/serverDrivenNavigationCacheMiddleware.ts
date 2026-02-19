import { isServer } from "Server/isServer"

const BUILD_APP_ROUTES_QUERY_NAME = "buildAppRoutesQuery"
const DEFAULT_SERVER_DRIVEN_NAVIGATION_CACHE_TTL_MS = 5 * 60 * 1000

interface CachedNavigationResponse {
  json?: any
  status?: number
  statusText?: string
}

interface NavigationCacheEntry {
  expiresAt: number
  response: CachedNavigationResponse
}

interface InflightResult {
  cachedResponse: CachedNavigationResponse
  rawResponse: any
}

const navigationResponseCache = new Map<string, NavigationCacheEntry>()
const inflightRequests = new Map<string, Promise<InflightResult>>()

const cloneJSON = <T>(value: T): T => {
  if (value === undefined) {
    return value
  }

  return JSON.parse(JSON.stringify(value)) as T
}

const cloneCachedResponse = (
  response: CachedNavigationResponse,
): CachedNavigationResponse => {
  return {
    ...response,
    json: cloneJSON(response.json),
  }
}

const toCachedResponse = (response): CachedNavigationResponse => {
  return {
    json: cloneJSON(response?.json),
    status: response?.status,
    statusText: response?.statusText,
  }
}

const isBuildAppRoutesRequest = req => {
  if (req.operation?.name === BUILD_APP_ROUTES_QUERY_NAME) {
    return true
  }

  const operationText = req.operation?.text
  if (typeof operationText !== "string") {
    return false
  }

  return operationText.includes(`query ${BUILD_APP_ROUTES_QUERY_NAME}`)
}

const isLiveNavigationRequest = req => {
  return req.variables?.requestedVersionState !== "DRAFT"
}

const getCacheControlHeader = req => {
  const headers = req.fetchOpts?.headers

  if (!headers) {
    return ""
  }

  if (typeof headers.get === "function") {
    return headers.get("Cache-Control") ?? headers.get("cache-control") ?? ""
  }

  const cacheControlHeader =
    headers["Cache-Control"] ?? headers["cache-control"]

  if (Array.isArray(cacheControlHeader)) {
    return cacheControlHeader.join(",")
  }

  return typeof cacheControlHeader === "string" ? cacheControlHeader : ""
}

const shouldBypassNavigationCache = req => {
  const cacheControlHeader = getCacheControlHeader(req)

  return /no-cache|no-store/i.test(cacheControlHeader)
}

const shouldStoreInNavigationCache = (response: CachedNavigationResponse) => {
  const status = response.status
  const hasSuccessfulStatus =
    typeof status !== "number" || (status >= 200 && status < 300)

  const hasGraphQLErrors =
    Array.isArray(response.json?.errors) && response.json.errors.length > 0

  const hasData = response.json != null && "data" in response.json

  return hasSuccessfulStatus && !hasGraphQLErrors && hasData
}

const getNavigationCacheKey = req => {
  const requestedVersionState = req.variables?.requestedVersionState ?? "LIVE"

  return `${BUILD_APP_ROUTES_QUERY_NAME}:${requestedVersionState}`
}

export const __serverDrivenNavigationCacheMiddlewareTestUtils = {
  clear: () => {
    navigationResponseCache.clear()
    inflightRequests.clear()
  },
}

export const serverDrivenNavigationCacheMiddleware = ({
  now = Date.now,
  ttl = DEFAULT_SERVER_DRIVEN_NAVIGATION_CACHE_TTL_MS,
} = {}) => {
  return next => async req => {
    if (!isServer || ttl <= 0) {
      return next(req)
    }

    if (!isBuildAppRoutesRequest(req) || !isLiveNavigationRequest(req)) {
      return next(req)
    }

    if (shouldBypassNavigationCache(req)) {
      return next(req)
    }

    const cacheKey = getNavigationCacheKey(req)
    const cacheEntry = navigationResponseCache.get(cacheKey)

    if (cacheEntry) {
      if (cacheEntry.expiresAt > now()) {
        return cloneCachedResponse(cacheEntry.response)
      }

      navigationResponseCache.delete(cacheKey)
    }

    const inflightRequest = inflightRequests.get(cacheKey)
    if (inflightRequest) {
      const inflightResult = await inflightRequest
      return cloneCachedResponse(inflightResult.cachedResponse)
    }

    const pendingRequest: Promise<InflightResult> = (async () => {
      const rawResponse = await next(req)
      const cachedResponse = toCachedResponse(rawResponse)

      if (shouldStoreInNavigationCache(cachedResponse)) {
        navigationResponseCache.set(cacheKey, {
          expiresAt: now() + ttl,
          response: cachedResponse,
        })
      }

      return { cachedResponse, rawResponse }
    })()

    inflightRequests.set(cacheKey, pendingRequest)

    try {
      const result = await pendingRequest
      return result.rawResponse
    } finally {
      inflightRequests.delete(cacheKey)
    }
  }
}
