import { ErrorBanner } from "Apps/Order2/Components/ErrorBanner"
import type { useCheckoutTracking } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutTracking"
import { forwardRef, useEffect } from "react"

export const ORDER_SUPPORT_EMAIL = "orders@artsy.net" as const

export const MailtoOrderSupport = () => {
  return <a href={`mailto:${ORDER_SUPPORT_EMAIL}`}>{ORDER_SUPPORT_EMAIL}</a>
}

/**
 * A message that can be displayed in an error banner. If it has a
 * ReactNode `message`, the displayText property should be used for
 * logging purposes.
 */
export type CheckoutErrorBannerMessage =
  | {
      title: string
      message: React.ReactNode
      displayText: string
      code?: string
      /**
       * When true, the banner renders but does not fire the
       * `errorMessageViewed` tracking event. Use for errors that were
       * already tracked elsewhere (e.g. re-displayed after a modal) to
       * avoid double reporting.
       */
      skipTracking?: boolean
    }
  | {
      title: string
      message: string
      code?: string
      skipTracking?: boolean
    }

/**
 * Factory function for creating a fallback 'something went wrong' error.
 * @param whileClause - Description of what action was being performed (e.g., "selecting your payment method")
 * @param code - Optional error code from the backend
 */
export const fallbackError = (
  whileClause: string,
  code?: string,
): CheckoutErrorBannerMessage => ({
  title: "An error occurred",
  message: (
    <>
      Something went wrong while {whileClause}. Please try again or contact{" "}
      <MailtoOrderSupport />.
    </>
  ) as React.ReactNode,
  displayText: `Something went wrong while ${whileClause}. Please try again or contact ${ORDER_SUPPORT_EMAIL}.`,
  code,
})

export interface CheckoutErrorBannerProps {
  error?: CheckoutErrorBannerMessage | null
  checkoutTracking: ReturnType<typeof useCheckoutTracking>
  analytics?: {
    flow: string
  }
}

export const CheckoutErrorBanner = forwardRef<
  HTMLDivElement,
  CheckoutErrorBannerProps
>(({ error, checkoutTracking, analytics }, ref) => {
  const flow = analytics?.flow

  // Track when error is displayed to user
  useEffect(() => {
    if (!error || !flow || error.skipTracking) return

    const messageText =
      "displayText" in error ? error.displayText : error.message

    checkoutTracking.errorMessageViewed({
      error_code: error.code || "unknown",
      title: error.title,
      message: messageText,
      flow,
    })
  }, [error, flow, checkoutTracking])

  if (!error) return null

  return (
    <ErrorBanner ref={ref} title={error.title}>
      {error.message}
    </ErrorBanner>
  )
})
