import { Message, Text } from "@artsy/palette"

interface ErrorBannerProps {
  error: ErrorProps
}

interface ErrorProps {
  title?: string
  message?: string
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ error }) => {
  if (!error) return null

  const title = error.title || "An error occurred"
  const message =
    error.message ||
    "Something went wrong. Please try again or contact orders@artsy.net"

  return (
    <Message variant="alert">
      <Text>{title}</Text>
      <Text>{message}</Text>
    </Message>
  )
}
