import { Message } from "@artsy/palette"
import { forwardRef } from "react"

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
    }
  | {
      title: string
      message: string
    }

export const ERROR_MESSAGES: Record<string, CheckoutErrorBannerMessage> = {
  generic: {
    title: "An error occurred",
    message: (
      <>
        Something went wrong. Please try again or contact <MailtoOrderSupport />
        .
      </>
    ) as React.ReactNode,
    displayText: `Something went wrong. Please try again or contact ${ORDER_SUPPORT_EMAIL}.`,
  },
} as const

export interface CheckoutErrorBannerProps {
  error?: CheckoutErrorBannerMessage | null
}

export const CheckoutErrorBanner = forwardRef<
  HTMLDivElement,
  CheckoutErrorBannerProps
>(({ error }, ref) => {
  if (!error) return null

  const title = error.title
  const message = error.message

  const variant = "error"

  return (
    <div ref={ref} tabIndex={-1} data-error-banner="true" role="alert">
      <Message variant={variant} title={title}>
        {message}
      </Message>
    </div>
  )
})
