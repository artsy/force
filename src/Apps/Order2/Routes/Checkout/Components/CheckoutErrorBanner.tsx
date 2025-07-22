import { Message } from "@artsy/palette"

export interface CheckoutErrorBannerProps {
  error?: {
    title?: string
    message?: string | React.ReactNode
  } | null
}

const SUPPORT_EMAIL = "orders@artsy.net" as const

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

  const variant = "error"

  return (
    <Message variant={variant} title={title}>
      {message}
    </Message>
  )
}

export const MailtoOrderSupport = () => {
  return <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
}
