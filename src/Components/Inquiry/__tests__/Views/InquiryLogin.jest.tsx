import { useArtworkInquiryRequest } from "Components/Inquiry/Hooks/useArtworkInquiryRequest"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { InquiryLogin } from "Components/Inquiry/Views/InquiryLogin"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { login } from "Utils/auth"
import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("Utils/auth")
jest.mock("../../Hooks/useArtworkInquiryRequest")
jest.mock("../../Hooks/useInquiryContext")
jest.mock("Utils/wait", () => ({ wait: () => Promise.resolve() }))
jest.mock("react-tracking")

describe("InquiryLogin", () => {
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
        setInquiry: jest.fn(),
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
    render(<InquiryLogin />)

    expect(screen.getByText("Log in to send your message")).toBeInTheDocument()
  })

  describe("without two-factor auth", () => {
    beforeAll(() => {
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.resolve({ user: { id: "example-id", access_token: "token" } }),
      )
    })

    it("logs in and sends the message", async () => {
      const { container } = render(<InquiryLogin />)

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()

      // Enter password
      const passwordInput = container.querySelector(
        'input[name="password"]',
      ) as HTMLInputElement
      fireEvent.change(passwordInput, { target: { value: "secret" } })

      // Submit form
      fireEvent.submit(container.querySelector("form")!)
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
      const { container } = render(<InquiryLogin />)

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()

      // Enter password
      const passwordInput = container.querySelector(
        'input[name="password"]',
      ) as HTMLInputElement
      fireEvent.change(passwordInput, { target: { value: "secret" } })

      // Login will error asking for 2fa code
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error("missing two-factor authentication code")),
      )

      // Submit form
      fireEvent.submit(container.querySelector("form")!)
      await flushPromiseQueue()

      // Input two factor auth code
      const authCodeInput = container.querySelector(
        'input[name="authenticationCode"]',
      ) as HTMLInputElement
      fireEvent.change(authCodeInput, { target: { value: "code" } })

      // Login works now
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.resolve({ user: { id: "id", access_token: "token" } }),
      )

      // Submit form again
      fireEvent.submit(container.querySelector("form")!)
      await flushPromiseQueue()

      expect(submitArtworkInquiryRequest).toBeCalled()
      expect(next).toBeCalled()
    })
  })

  describe("with on-demand auth", () => {
    it("logs in and sends the message", async () => {
      const { container } = render(<InquiryLogin />)

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()

      // Enter password
      const passwordInput = container.querySelector(
        'input[name="password"]',
      ) as HTMLInputElement
      fireEvent.change(passwordInput, { target: { value: "secret" } })

      // Login will error asking for 2fa code
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.reject(new Error("missing on-demand authentication code")),
      )

      // Submit form
      fireEvent.submit(container.querySelector("form")!)
      await flushPromiseQueue()

      expect(
        screen.getByText(
          "Your safety and security are important to us. Please check your email for a one-time authentication code to complete your login.",
        ),
      ).toBeInTheDocument()

      // Input two factor auth code
      const authCodeInput = container.querySelector(
        'input[name="authenticationCode"]',
      ) as HTMLInputElement
      fireEvent.change(authCodeInput, { target: { value: "code" } })

      // Login works now
      ;(login as jest.Mock).mockImplementation(() =>
        Promise.resolve({ user: { id: "id", access_token: "token" } }),
      )

      // Submit form again
      fireEvent.submit(container.querySelector("form")!)
      await flushPromiseQueue()

      expect(submitArtworkInquiryRequest).toBeCalled()
      expect(next).toBeCalled()
    })
  })
})
