import { captureException } from "@sentry/browser"

export function setupGlobalErrorHandlers() {
  // Handle resource loading failures (scripts, images, stylesheets, etc.)
  window.addEventListener(
    "error",
    event => {
      const target = event.target as
        | (HTMLElement & { src?: string; href?: string })
        | null

      // Only track resource loading errors, not JavaScript runtime errors
      if (target && target !== (window as any)) {
        const resourceUrl = target.src || target.href || "unknown"
        const resourceType = target.tagName?.toLowerCase() || "unknown"

        captureException(
          new Error(`Resource load failed: ${event.message || "Load failed"}`),
          {
            tags: {
              source: "resource_load_failure",
              resource_type: resourceType,
            },
            extra: {
              resourceUrl,
              resourceType,
              errorMessage: event.message,
              filename: event.filename,
              lineno: event.lineno,
              colno: event.colno,
              targetElement: target.outerHTML,
            },
          },
        )
      }
    },
    // Use capture phase to catch all resource errors
    true,
  )

  // Handle unhandled promise rejections (network failures, etc.)
  window.addEventListener("unhandledrejection", event => {
    const reason = event.reason

    // Check if it's a network-related error
    if (
      reason instanceof Error &&
      (reason.message.includes("Load failed") ||
        reason.message.includes("Failed to fetch") ||
        reason.message.includes("Network request failed") ||
        reason.name === "NetworkError")
    ) {
      captureException(reason, {
        tags: {
          source: "network_failure",
          error_type: "unhandled_rejection",
        },
        extra: {
          promiseRejectionReason: reason.message,
          stack: reason.stack,
        },
      })
    }
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
