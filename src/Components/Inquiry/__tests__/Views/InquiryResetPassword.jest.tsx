import { mount } from "enzyme"
import { InquiryResetPassword } from "../../Views/InquiryResetPassword"
import { useTracking } from "react-tracking"
import { flushPromiseQueue } from "DevTools"

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

  it("renders correctly", () => {
    const wrapper = mount(<InquiryResetPassword />)

    expect(wrapper.html()).toContain(
      "Please check your email (example@example.com) for instructions on how to reset your password."
    )
  })

  it("tracks the action", async () => {
    mount(<InquiryResetPassword />)

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
