import { Message } from "@artsy/palette"

interface ErrorBannerProps {
  error: ErrorProps
}

interface ErrorProps {
  title?: string
  message?: string
}

const SUPPORT_EMAIL = "orders@artsy.net"

export const CheckoutErrorBanner: React.FC<ErrorBannerProps> = ({ error }) => {
  if (!error) return null

  const title = error.title || "An error occurred"
  const message =
    error.message ||
    `Something went wrong. Please try again or contact ${SUPPORT_EMAIL}.`

  return (
    <Message variant="alert" title={title}>
      {message}
    </Message>
  )
}
