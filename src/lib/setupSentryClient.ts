import * as Sentry from "@sentry/browser"
import { Integrations } from "@sentry/tracing"
import { Dedupe } from "@sentry/integrations"
import {
  ALLOWED_URLS,
  DENIED_URLS,
  IGNORED_ERRORS,
} from "./analytics/sentryFilters"

export function setupSentryClient(sd) {
  Sentry.init({
    allowUrls: ALLOWED_URLS,
    denyUrls: DENIED_URLS,
    dsn: sd.SENTRY_PUBLIC_DSN,
    ignoreErrors: IGNORED_ERRORS,
    integrations: [new Integrations.BrowserTracing(), new Dedupe()],
  })
}
