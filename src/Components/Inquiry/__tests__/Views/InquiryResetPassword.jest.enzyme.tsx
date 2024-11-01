import { mount } from "enzyme"
import { InquiryResetPassword } from "Components/Inquiry/Views/InquiryResetPassword"
import { useTracking } from "react-tracking"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"

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
    const wrapper = mount(<InquiryResetPassword />)

    // Submit form
    wrapper.find("form").simulate("submit")
    await flushPromiseQueue()

    expect(wrapper.html()).toContain(
      "We've sent a link to reset your password if an account is associated with this email."
    )
  })

  it("tracks the action", async () => {
    const wrapper = mount(<InquiryResetPassword />)

    // Submit form
    wrapper.find("form").simulate("submit")
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
