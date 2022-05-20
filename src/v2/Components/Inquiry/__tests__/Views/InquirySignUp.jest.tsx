import { mount } from "enzyme"
import { flushPromiseQueue } from "v2/DevTools"
import { InquirySignUp } from "../../Views/InquirySignUp"
import { useArtworkInquiryRequest } from "../../Hooks/useArtworkInquiryRequest"
import { signUp } from "v2/Utils/auth"
import { useInquiryContext } from "../../Hooks/useInquiryContext"
import { fill } from "../util"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.mock("v2/Utils/auth")
jest.mock("../../Hooks/useArtworkInquiryRequest")
jest.mock("../../Hooks/useInquiryContext")
jest.mock("v2/Utils/wait", () => ({ wait: () => Promise.resolve() }))
jest.mock("v2/System/Analytics/useTracking")

describe("InquirySignUp", () => {
  const next = jest.fn()
  const submitArtworkInquiryRequest = jest.fn()
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useArtworkInquiryRequest as jest.Mock).mockImplementation(() => ({
      submitArtworkInquiryRequest,
    }))
    ;(useInquiryContext as jest.Mock).mockImplementation(() => ({
      artworkID: "example",
      engine: { decide: jest.fn().mockReturnValue(false) },
      inquiry: { email: "example@example.com", message: "Hello world" },
      next,
      setContext: jest.fn(),
      setRelayEnvironment: jest.fn(),
    }))
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    next.mockReset()
    submitArtworkInquiryRequest.mockReset()
    trackEvent.mockClear()
  })

  it("renders correctly", () => {
    const wrapper = mount(<InquirySignUp />)

    expect(wrapper.html()).toContain("Create an account to send your message")
  })

  describe("success", () => {
    beforeAll(() => {
      ;(signUp as jest.Mock).mockImplementation(() =>
        Promise.resolve({ user: { id: "example-id", access_token: "token" } })
      )
    })

    it("signs up the user and sends the message", async () => {
      const wrapper = mount(<InquirySignUp />)

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()

      // Fill inputs
      fill(wrapper, "name", "Example Example")
      fill(wrapper, "email", "example@example.com")
      fill(wrapper, "password", "secret")

      // Submit form
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()

      expect(submitArtworkInquiryRequest).toBeCalledWith({
        artworkID: "example",
        contactGallery: true,
        message: "Hello world",
      })
      expect(next).toBeCalled()
      expect(trackEvent).toBeCalledTimes(1)
      expect(trackEvent).toBeCalledWith({
        action: "createdAccount",
        auth_redirect: "http://localhost/",
        context_module: "inquiry",
        intent: "inquire",
        onboarding: false,
        service: "email",
        trigger: "click",
        type: "signup",
        user_id: "example-id",
      })
    })
  })

  describe("error", () => {
    beforeAll(() => {
      ;(signUp as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error("something went wrong"))
      )
    })

    it("handles and displays the error to the user", async () => {
      const wrapper = mount(<InquirySignUp />)

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()

      // Fill inputs
      fill(wrapper, "name", "Example Example")
      fill(wrapper, "email", "example@example.com")
      fill(wrapper, "password", "secret")

      // Submit form
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()
      expect(wrapper.html()).toContain("something went wrong")
    })
  })
})
