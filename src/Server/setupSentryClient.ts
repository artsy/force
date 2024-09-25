import { init, browserTracingIntegration } from "@sentry/browser"
import { dedupeIntegration } from "@sentry/integrations"
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
