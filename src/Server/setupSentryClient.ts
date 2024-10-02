import {
  init,
  browserTracingIntegration,
  dedupeIntegration,
} from "@sentry/browser"
import {
  ALLOWED_URLS,
  DENIED_URLS,
  IGNORED_ERRORS,
} from "./analytics/sentryFilters"

export function setupSentryClient(sentryPublicDSN: string) {
  init({
    allowUrls: ALLOWED_URLS,
    denyUrls: DENIED_URLS,
    dsn: sentryPublicDSN,
    ignoreErrors: IGNORED_ERRORS,
    integrations: [browserTracingIntegration(), dedupeIntegration()],
  })
}
