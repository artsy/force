import {
  ALLOWED_URLS,
  DENIED_URLS,
  IGNORED_ERRORS,
} from "Server/analytics/sentryFilters"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"
import { getENV } from "Utils/getENV"
import {
  browserTracingIntegration,
  dedupeIntegration,
  init,
  SEMANTIC_ATTRIBUTE_SENTRY_OP,
  SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN,
  SEMANTIC_ATTRIBUTE_SENTRY_SOURCE,
  type Span,
  startBrowserTracingNavigationSpan,
  startBrowserTracingPageLoadSpan,
} from "@sentry/browser"
import type { Match } from "found"

let initialPageLoadSpan: Span | undefined | null

// For use in router RenderStates callback hooks
export let sentryRouterTracing

export function setupSentryClient() {
  if (getENV("NODE_ENV") !== "production") {
    return
  }

  const sentryClient = init({
    allowUrls: ALLOWED_URLS,
    denyUrls: DENIED_URLS,
    dsn: getENV("SENTRY_PUBLIC_DSN"),
    ignoreErrors: IGNORED_ERRORS,
    tracesSampleRate: 0.08,
    integrations: [
      browserTracingIntegration({
        // See sentry router tracing below
        instrumentNavigation: false,
        instrumentPageLoad: false,
      }),
      dedupeIntegration(),
    ],
    // Uncomment to see sentry traces in browser console
    // debug: false
  })

  // Init router tracing and set initial page load span
  sentryRouterTracing = setupSentryRouterTracing(sentryClient)
  initialPageLoadSpan = sentryRouterTracing?.initialPageloadStart()
}

export const setupSentryRouterTracing = sentryClient => {
  return {
    initialPageloadStart: () => {
      const foundRoute = findRoutesByPath({ path: window.location.pathname })
      const routeId = foundRoute[0].route.path || "/"

      return startBrowserTracingPageLoadSpan(sentryClient, {
        name: routeId,
        attributes: {
          [SEMANTIC_ATTRIBUTE_SENTRY_OP]: "pageload",
          [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]:
            "auto.pageload.react.client_router",
          [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url",
        },
      })
    },

    initialPageloadComplete: (_match: Match) => {
      if (initialPageLoadSpan) {
        const foundRoute = findRoutesByPath({ path: window.location.pathname })
        const routeId = foundRoute[0].route.path as string

        initialPageLoadSpan.updateName(routeId)
        initialPageLoadSpan.setAttribute(
          SEMANTIC_ATTRIBUTE_SENTRY_SOURCE,
          "route"
        )

        initialPageLoadSpan = null
        return
      }
    },

    navigation: (match: Match) => {
      sentryRouterTracing?.initialPageloadComplete(match)

      const foundRoute = findRoutesByPath({ path: window.location.pathname })
      const routeId = foundRoute[0].route.path as string

      startBrowserTracingNavigationSpan(sentryClient, {
        op: "navigation",
        // Matches by path ID: /artist/:slug
        name: routeId,
        attributes: {
          [SEMANTIC_ATTRIBUTE_SENTRY_OP]: "navigation",
          [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]:
            "auto.navigation.react.client_router",
          [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "route",
          ...routeMatchToParamSpanAttributes(match.params),
          // TODO:
          // SEMANTIC_ATTRIBUTE_CACHE_HIT
        },
      })
    },
  }
}

function routeMatchToParamSpanAttributes(
  params: Match["params"]
): Record<string, string> {
  if (!params) {
    return {}
  }

  const paramAttributes: Record<string, string> = {}

  Object.entries(params).forEach(([key, value]) => {
    paramAttributes[`url.path.params.${key}`] = value
  })

  return paramAttributes
}
