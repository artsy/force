import { mount } from "enzyme"
import { InquiryLogin } from "../../Views/InquiryLogin"
import { login } from "v2/Utils/auth"
import { useArtworkInquiryRequest } from "../../Hooks/useArtworkInquiryRequest"
import { flushPromiseQueue } from "v2/DevTools"
import { useInquiryContext } from "../../Hooks/useInquiryContext"
import { fill } from "../util"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.mock("v2/Utils/auth")
jest.mock("../../Hooks/useArtworkInquiryRequest")
jest.mock("../../Hooks/useInquiryContext")
jest.mock("v2/Utils/wait", () => ({ wait: () => Promise.resolve() }))
jest.mock("v2/System/Analytics/useTracking")

describe("InquiryLogin", () => {
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
    const wrapper = mount(<InquiryLogin />)

    expect(wrapper.html()).toContain(
      "We found an Artsy account associated with example@example.com."
    )
  })

  describe("without two-factor auth", () => {
    beforeAll(() => {
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.resolve({ user: { id: "example-id", access_token: "token" } })
      )
    })

    it("logs in and sends the message", async () => {
      const wrapper = mount(<InquiryLogin />)

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()

      // Enter password
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
        action: "successfullyLoggedIn",
        auth_redirect: "http://localhost/",
        context_module: "inquiry",
        intent: "inquire",
        service: "email",
        trigger: "click",
        type: "login",
        user_id: "example-id",
      })
    })
  })

  describe("with two-factor auth", () => {
    it("logs in and sends the message", async () => {
      const wrapper = mount(<InquiryLogin />)

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()

      // Enter password
      fill(wrapper, "password", "secret")

      // Login will error asking for 2fa code
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error("missing two-factor authentication code"))
      )

      // Submit form
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()
      wrapper.update()

      // Input two factor auth code
      fill(wrapper, "authenticationCode", "code")

      // Login works now
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.resolve({ user: { id: "id", access_token: "token" } })
      )

      // Submit form again
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()

      expect(submitArtworkInquiryRequest).toBeCalled()
      expect(next).toBeCalled()
    })
  })

  describe("with on-demand auth", () => {
    it("logs in and sends the message", async () => {
      const wrapper = mount(<InquiryLogin />)

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()

      // Enter password
      fill(wrapper, "password", "secret")

      // Login will error asking for 2fa code
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error("missing on-demand authentication code"))
      )

      // Submit form
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()
      wrapper.update()

      expect(wrapper.text()).toContain(
        "Your safety and security are important to us. Please check your email for a one-time authentication code to complete your login."
      )

      // Input two factor auth code
      fill(wrapper, "authenticationCode", "code")

      // Login works now
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.resolve({ user: { id: "id", access_token: "token" } })
      )

      // Submit form again
      wrapper.find("form").simulate("submit")
      await flushPromiseQueue()

      expect(submitArtworkInquiryRequest).toBeCalled()
      expect(next).toBeCalled()
    })
  })
})
