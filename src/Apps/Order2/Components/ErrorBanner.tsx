import { Message } from "@artsy/palette"
import { forwardRef } from "react"

export interface ErrorBannerProps {
  title: string
  children: React.ReactNode
}

export const ErrorBanner = forwardRef<HTMLDivElement, ErrorBannerProps>(
  ({ title, children }, ref) => {
    return (
      <div ref={ref} tabIndex={-1} data-error-banner="true" role="alert">
        <Message variant="error" title={title}>
          {children}
        </Message>
      </div>
    )
  },
)
