import { InquiryResetPassword } from "Components/Inquiry/Views/InquiryResetPassword"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("../../Hooks/useInquiryContext", () => ({
  useInquiryContext: () => ({
    inquiry: { email: "example@example.com" },
  }),
}))

jest.mock("react-tracking")

jest.mock("Utils/auth", () => ({
  forgotPassword: () => Promise.resolve(),
}))

describe("InquiryResetPassword", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    trackEvent.mockClear()
  })

  it("renders correctly", async () => {
    const { container } = render(<InquiryResetPassword />)

    // Submit form
    fireEvent.submit(container.querySelector("form")!)
    await flushPromiseQueue()

    await waitFor(() => {
      expect(
        screen.getByText(
          "We've sent a link to reset your password if an account is associated with this email."
        )
      ).toBeInTheDocument()
    })
  })

  it("tracks the action", async () => {
    const { container } = render(<InquiryResetPassword />)

    // Submit form
    fireEvent.submit(container.querySelector("form")!)
    await flushPromiseQueue()

    expect(trackEvent).toBeCalledTimes(1)
    expect(trackEvent).toBeCalledWith({
      action: "resetYourPassword",
      auth_redirect: "http://localhost/",
      context_module: "inquiry",
      intent: "inquire",
      service: "email",
      trigger: "click",
      type: "forgot",
    })
  })
})
