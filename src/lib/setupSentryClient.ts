import * as Sentry from "@sentry/browser"
import { Integrations } from "@sentry/tracing"
import { DENIED_URLS, IGNORED_ERRORS } from "./analytics/sentryFilters"

export function setupSentryClient(sd) {
  Sentry.init({
    denyUrls: DENIED_URLS,
    dsn: sd.SENTRY_PUBLIC_DSN,
    ignoreErrors: IGNORED_ERRORS,
    integrations: [new Integrations.BrowserTracing()],
  })
}
