import { useArtworkInquiryRequest } from "Components/Inquiry/Hooks/useArtworkInquiryRequest"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { InquirySignUp } from "Components/Inquiry/Views/InquirySignUp"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { signUp } from "Utils/auth"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { useTracking } from "react-tracking"

jest.mock("Utils/auth")
jest.mock("../../Hooks/useArtworkInquiryRequest")
jest.mock("../../Hooks/useInquiryContext")
jest.mock("Utils/wait", () => ({ wait: () => Promise.resolve() }))
jest.mock("react-tracking")

const mockSendToast = jest.fn()
jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  useToasts: () => ({ sendToast: mockSendToast }),
}))

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
    render(<InquirySignUp />)

    expect(screen.getByText("Sign up to send your message")).toBeInTheDocument()
  })

  describe("success", () => {
    beforeAll(() => {
      ;(signUp as jest.Mock).mockImplementation(() =>
        Promise.resolve({ user: { id: "example-id", access_token: "token" } }),
      )
    })

    it("signs up the user and sends the message", async () => {
      render(<InquirySignUp />)

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()

      // Fill inputs
      fireEvent.change(screen.getByPlaceholderText("Your full name"), {
        target: { value: "Example Example" },
      })
      fireEvent.change(screen.getByDisplayValue("example@example.com"), {
        target: { value: "example@example.com" },
      })
      fireEvent.change(screen.getByPlaceholderText("Your password"), {
        target: { value: "secret" },
      })

      // Submit form
      const form = screen
        .getByText("Sign up to send your message")
        .closest("form")
      if (!form) {
        throw new Error("Form not found")
      }
      fireEvent.submit(form)
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
        Promise.reject(new Error("something went wrong")),
      )
    })

    it("handles and displays the error to the user", async () => {
      render(<InquirySignUp />)

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()

      // Fill inputs
      fireEvent.change(screen.getByPlaceholderText("Your full name"), {
        target: { value: "Example Example" },
      })
      fireEvent.change(screen.getByDisplayValue("example@example.com"), {
        target: { value: "example@example.com" },
      })
      fireEvent.change(screen.getByPlaceholderText("Your password"), {
        target: { value: "secret" },
      })

      // Submit form
      const form = screen
        .getByText("Sign up to send your message")
        .closest("form")
      if (!form) {
        throw new Error("Form not found")
      }
      fireEvent.submit(form)
      await flushPromiseQueue()

      expect(submitArtworkInquiryRequest).not.toBeCalled()
      expect(next).not.toBeCalled()
      expect(screen.getByText("something went wrong")).toBeInTheDocument()
    })
  })

  describe("toast notification", () => {
    beforeEach(() => {
      mockSendToast.mockClear()
      submitArtworkInquiryRequest.mockResolvedValue({
        submitInquiryRequestMutation: {
          inquiryRequest: {
            internalID: "inquiry-123",
          },
        },
      })
      ;(signUp as jest.Mock).mockImplementation(() =>
        Promise.resolve({ user: { id: "example-id", access_token: "token" } }),
      )
    })

    it("displays success toast with correct message after signing up and sending inquiry", async () => {
      render(<InquirySignUp />)

      // Fill inputs
      fireEvent.change(screen.getByPlaceholderText("Your full name"), {
        target: { value: "Example Example" },
      })
      fireEvent.change(screen.getByDisplayValue("example@example.com"), {
        target: { value: "example@example.com" },
      })
      fireEvent.change(screen.getByPlaceholderText("Your password"), {
        target: { value: "secret" },
      })

      // Submit form
      const form = screen
        .getByText("Sign up to send your message")
        .closest("form")
      if (!form) {
        throw new Error("Form not found")
      }
      fireEvent.submit(form)
      await flushPromiseQueue()

      await waitFor(() => {
        expect(mockSendToast).toHaveBeenCalledWith({
          variant: "success",
          message: "Message sent",
          description: "Expect a response within 1-3 business days.",
        })
      })

      expect(next).toHaveBeenCalled()
    })
  })
})
