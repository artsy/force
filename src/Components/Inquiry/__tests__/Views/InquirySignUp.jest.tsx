import { mount } from "enzyme"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { InquirySignUp } from "Components/Inquiry/Views/InquirySignUp"
import { useArtworkInquiryRequest } from "Components/Inquiry/Hooks/useArtworkInquiryRequest"
import { signUp } from "Utils/auth"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { fill } from "Components/Inquiry/__tests__/util"
import { useTracking } from "react-tracking"
import { render, screen } from "@testing-library/react"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

jest.mock("Utils/auth")
jest.mock("../../Hooks/useArtworkInquiryRequest")
jest.mock("../../Hooks/useInquiryContext")
jest.mock("Utils/wait", () => ({ wait: () => Promise.resolve() }))
jest.mock("react-tracking")
jest.mock("System/Hooks/useFeatureFlag")

describe("InquirySignUp", () => {
  const next = jest.fn()
  const submitArtworkInquiryRequest = jest.fn()
  const trackEvent = jest.fn()
  let setInqirySpy: jest.SpyInstance

  beforeAll(() => {
    ;(useArtworkInquiryRequest as jest.Mock).mockImplementation(() => ({
      submitArtworkInquiryRequest,
    }))
    ;(useInquiryContext as jest.Mock).mockImplementation(() => {
      const actual = jest
        .requireActual("../../Hooks/useInquiryContext")
        .useInquiryContext()

      setInqirySpy = jest.spyOn(actual, "setInquiry")

      return {
        ...actual,
        artworkID: "example",
        engine: { decide: jest.fn().mockReturnValue(false) },
        inquiry: { email: "example@example.com", message: "Hello world" },
        next,
        setContext: jest.fn(),
        setRelayEnvironment: jest.fn(),
      }
    })
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    next.mockReset()
    submitArtworkInquiryRequest.mockReset()
    trackEvent.mockClear()
    setInqirySpy.mockReset()
  })

  it("renders correctly", () => {
    const wrapper = mount(<InquirySignUp />)

    expect(wrapper.html()).toContain("Sign up to send your message")
  })

  it("renders a disclaimer", () => {
    render(<InquirySignUp />)

    expect(screen.getByTestId("disclaimer")).toHaveTextContent(
      "By signing up, you agree to our Terms of Use, Privacy Policy, Conditions of Sale and to receiving emails from Artsy."
    )
    expect(screen.getByRole("link", { name: "Terms of Use" })).toHaveAttribute(
      "href",
      "/terms"
    )
    expect(
      screen.getByRole("link", { name: "Privacy Policy" })
    ).toHaveAttribute("href", "/privacy")
    expect(
      screen.getByRole("link", { name: "Conditions of Sale" })
    ).toHaveAttribute("href", "/conditions-of-sale")
  })

  describe("when the new disclaimer is enabled", () => {
    beforeAll(() => {
      ;(useFeatureFlag as jest.Mock).mockImplementation(
        (f: string) => f === "diamond_new-terms-and-conditions"
      )
    })

    afterAll(() => {
      ;(useFeatureFlag as jest.Mock).mockReset()
    })

    it("renders the new disclaimer", () => {
      render(<InquirySignUp />)

      expect(screen.getByTestId("disclaimer")).toHaveTextContent(
        "By signing up, you agree to Artsy's Terms and Conditions, Privacy Policy and to receiving emails from Artsy."
      )
      expect(
        screen.getByRole("link", { name: "Terms and Conditions" })
      ).toHaveAttribute("href", "/terms")
      expect(
        screen.getByRole("link", { name: "Privacy Policy" })
      ).toHaveAttribute("href", "/privacy")

      // TODO: remove this assertion when deprecating diamond_new-terms-and-conditions
      expect(
        screen.queryByRole("link", { name: "Conditions of Sale" })
      ).not.toBeInTheDocument()
    })
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
