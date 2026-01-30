import { Message } from "@artsy/palette"
import { forwardRef } from "react"

export interface CheckoutErrorBannerProps {
  error?: {
    title?: string
    message?: string | React.ReactNode
  } | null
}

const SUPPORT_EMAIL = "orders@artsy.net" as const

export const CheckoutErrorBanner = forwardRef<
  HTMLDivElement,
  CheckoutErrorBannerProps
>(({ error }, ref) => {
  if (!error) return null

  const title = error.title || "An error occurred"
  const message = error.message || (
    <>
      Something went wrong. Please try again or contact <MailtoOrderSupport />.
    </>
  )

  const variant = "error"

  return (
    <div ref={ref} tabIndex={-1} data-error-banner="true" role="alert">
      <Message variant={variant} title={title}>
        {message}
      </Message>
    </div>
  )
})

CheckoutErrorBanner.displayName = "CheckoutErrorBanner"

export const MailtoOrderSupport = () => {
  return <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
}
MailtoOrderSupport.displayName = SUPPORT_EMAIL
