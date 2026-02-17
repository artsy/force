import { Message } from "@artsy/palette"
import { forwardRef, useEffect } from "react"
import { useCheckoutContext } from "../Hooks/useCheckoutContext"

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
    }
  | {
      title: string
      message: string
      code?: string
    }

/**
 * Factory function for creating a fallback 'something went wrong' error.
 * @param whileClause - Description of what action was being performed (e.g., "selecting your payment method")
 * @param code - Optional error code from the backend
 */
export const somethingWentWrongError = (
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
  analytics?: {
    flow: string
  }
}

export const CheckoutErrorBanner = forwardRef<
  HTMLDivElement,
  CheckoutErrorBannerProps
>(({ error, analytics }, ref) => {
  const { checkoutTracking } = useCheckoutContext()
  const flow = analytics?.flow

  // Track when error is displayed to user
  useEffect(() => {
    if (!error || !flow) return

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

  const title = error.title
  const message = error.message

  return (
    <div ref={ref} tabIndex={-1} data-error-banner="true" role="alert">
      <Message variant="error" title={title}>
        {message}
      </Message>
    </div>
  )
})
