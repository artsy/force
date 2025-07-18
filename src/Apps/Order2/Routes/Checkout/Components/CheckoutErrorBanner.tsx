import { Message, type MessageProps } from "@artsy/palette"

export interface CheckoutErrorBannerProps {
  error?: {
    title?: string
    message?: string | React.ReactNode
    variant?: MessageProps["variant"]
  } | null
}

const SUPPORT_EMAIL = "orders@artsy.net" as const

/**
 * A banner to display errors that occur during the checkout process.
 * use [[MAILTO_ORDER_SUPPORT]] in the message to insert the support email.
 */
export const CheckoutErrorBanner: React.FC<CheckoutErrorBannerProps> = ({
  error,
}) => {
  if (!error) return null

  const title = error.title || "An error occurred"
  const message = error.message || (
    <>
      Something went wrong. Please try again or contact <MailtoOrderSupport />.
    </>
  )

  const variant = error.variant || "error"

  return (
    <Message variant={variant} title={title}>
      {message}
    </Message>
  )
}

export const MailtoOrderSupport = () => {
  return <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
}
