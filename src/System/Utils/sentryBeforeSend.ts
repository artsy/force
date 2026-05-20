import type { ErrorEvent } from "@sentry/browser"

export function sentryBeforeSend(event: ErrorEvent): ErrorEvent | null {
  const exception = event.exception?.values?.[0]

  if (isCloudflareChallenge(exception?.type, exception?.value)) {
    return null
  }

  return event
}

function isCloudflareChallenge(
  type: string | undefined,
  value: string | undefined,
): boolean {
  return (
    type === "RRNLRequestError" &&
    (value?.includes("<!DOCTYPE html>") ?? false) &&
    (value?.includes("Just a moment...") ?? false)
  )
}
