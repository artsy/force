import { captureException } from "@sentry/browser"

export function setupGlobalErrorHandlers() {
  // Handle unhandled promise rejections (TEMPORARILY catch ALL to debug "Load failed")
  window.addEventListener("unhandledrejection", event => {
    const reason = event.reason

    // TEMPORARILY catch ALL unhandled rejections to identify "Load failed" source
    // TODO: Remove this catch-all once we identify the root cause
    captureException(
      reason instanceof Error
        ? reason
        : new Error("Unhandled promise rejection"),
      {
        tags: {
          source: "all_unhandled_rejections",
          error_type: "debug_catch_all",
          reason_type: typeof reason,
          is_error_instance: reason instanceof Error ? "yes" : "no",
        },
        extra: {
          originalReason: reason,
          reasonMessage: reason?.message || String(reason),
          reasonName: reason?.name,
          stack: reason?.stack,
          reasonConstructor: reason?.constructor?.name,
          reasonStringified: JSON.stringify(
            reason,
            Object.getOwnPropertyNames(reason),
          ),
        },
      },
    )
  })

  // TODO: Consider adding additional error tracking in follow-up PRs:
  // - Fetch tracking (safer alternatives: interceptor library, wrapper function, Service Worker)
  // - CSP violations: addEventListener("securitypolicyviolation") for blocked resources
  // - Network connectivity: addEventListener("offline/online") for connection issues
  // - Chunk loading failures: track dynamic import() errors for code splitting
  // - Service Worker errors: track SW registration/update failures
  // - WebSocket connection failures: track real-time connection issues
  // - Media loading errors: track video/audio loading failures if relevant
}
