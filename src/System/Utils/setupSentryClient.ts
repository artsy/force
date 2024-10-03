import {
  init,
  browserTracingIntegration,
  dedupeIntegration,
  startBrowserTracingPageLoadSpan,
  SEMANTIC_ATTRIBUTE_SENTRY_SOURCE,
  Span,
  SEMANTIC_ATTRIBUTE_SENTRY_OP,
  SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN,
  startBrowserTracingNavigationSpan,
} from "@sentry/browser"
import {
  ALLOWED_URLS,
  DENIED_URLS,
  IGNORED_ERRORS,
} from "Server/analytics/sentryFilters"
import { Client } from "@sentry/types/build/types/client"
import { Match } from "found"
import { getENV } from "Utils/getENV"

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
    tracesSampleRate: 1.0,
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
      return startBrowserTracingPageLoadSpan(sentryClient as Client, {
        name: window.location.pathname,
        attributes: {
          [SEMANTIC_ATTRIBUTE_SENTRY_OP]: "pageload",
          [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]:
            "auto.pageload.react.client_router",
          [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url",
        },
      })
    },

    initialPageloadComplete: (match: Match) => {
      if (initialPageLoadSpan) {
        initialPageLoadSpan.updateName(match.location.pathname)
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

      startBrowserTracingNavigationSpan(sentryClient, {
        op: "navigation",
        name: match.location.pathname,
        attributes: {
          [SEMANTIC_ATTRIBUTE_SENTRY_OP]: "navigation",
          [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]:
            "auto.navigation.react.client_router",
          [SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "route",
          ...routeMatchToParamSpanAttributes(match.params),
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
