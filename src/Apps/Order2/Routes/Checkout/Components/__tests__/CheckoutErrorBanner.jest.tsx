import { render, screen } from "@testing-library/react"
import { CheckoutErrorBanner } from "../CheckoutErrorBanner"

const mockCheckoutTracking = {
  errorMessageViewed: jest.fn(),
}

jest.mock("../../Hooks/useCheckoutContext", () => ({
  useCheckoutContext: () => ({
    checkoutTracking: mockCheckoutTracking,
  }),
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe("CheckoutErrorBanner", () => {
  it("renders error message", () => {
    const error = {
      title: "Test Error",
      message: "This is a test error message",
    }

    render(<CheckoutErrorBanner error={error} />)

    expect(screen.getByText("Test Error")).toBeInTheDocument()
    expect(screen.getByText("This is a test error message")).toBeInTheDocument()
  })

  it("renders nothing when error is null", () => {
    const { container } = render(<CheckoutErrorBanner error={null} />)

    expect(container.firstChild).toBeNull()
  })

  it("tracks error message when displayed with analytics", () => {
    const error = {
      title: "Payment Error",
      message: "Payment failed",
      code: "payment_failed",
    }

    const analytics = {
      flow: "User setting payment",
    }

    render(<CheckoutErrorBanner error={error} analytics={analytics} />)

    expect(mockCheckoutTracking.errorMessageViewed).toHaveBeenCalledWith({
      error_code: "payment_failed",
      title: "Payment Error",
      message: "Payment failed",
      flow: "User setting payment",
    })
  })

  it("tracks error with displayText when message is ReactNode", () => {
    const error = {
      title: "Complex Error",
      message: (
        <div>
          Complex message <a href="/link">link</a>
        </div>
      ),
      displayText: "Complex message link",
      code: "complex_error",
    }

    const analytics = {
      flow: "User setting delivery",
    }

    render(<CheckoutErrorBanner error={error} analytics={analytics} />)

    expect(mockCheckoutTracking.errorMessageViewed).toHaveBeenCalledWith({
      error_code: "complex_error",
      title: "Complex Error",
      message: "Complex message link",
      flow: "User setting delivery",
    })
  })

  it("uses 'unknown' as error_code when code is not provided", () => {
    const error = {
      title: "Unknown Error",
      message: "Something went wrong",
    }

    const analytics = {
      flow: "User setting offer",
    }

    render(<CheckoutErrorBanner error={error} analytics={analytics} />)

    expect(mockCheckoutTracking.errorMessageViewed).toHaveBeenCalledWith({
      error_code: "unknown",
      title: "Unknown Error",
      message: "Something went wrong",
      flow: "User setting offer",
    })
  })

  it("does not track when analytics is not provided", () => {
    const error = {
      title: "No Tracking",
      message: "This should not be tracked",
    }

    render(<CheckoutErrorBanner error={error} />)

    expect(mockCheckoutTracking.errorMessageViewed).not.toHaveBeenCalled()
  })
})
