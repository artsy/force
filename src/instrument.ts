import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node"
import { IGNORED_ERRORS } from "Server/analytics/sentryFilters"
import { SENTRY_PRIVATE_DSN, SENTRY_TRACING_ENABLED } from "Server/config"

const TRACING_CONFIG: Sentry.NodeOptions = {
  integrations: [nodeProfilingIntegration()],
  profilesSampleRate: 0.08, // Capture 8% of the transactions
  tracesSampleRate: 0.08, // Capture 8% of the transactions
}

if (SENTRY_PRIVATE_DSN) {
  Sentry.init({
    dsn: SENTRY_PRIVATE_DSN,
    ignoreErrors: IGNORED_ERRORS,
    ...(SENTRY_TRACING_ENABLED ? TRACING_CONFIG : {}),
  })
}
