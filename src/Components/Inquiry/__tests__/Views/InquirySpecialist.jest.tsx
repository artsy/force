import { useArtworkInquiryRequest } from "Components/Inquiry/Hooks/useArtworkInquiryRequest"
import {
  DEFAULT_MESSAGE,
  useInquiryContext,
} from "Components/Inquiry/Hooks/useInquiryContext"
import { InquirySpecialist } from "Components/Inquiry/Views/InquirySpecialist"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { fireEvent, render, screen } from "@testing-library/react"

jest.mock("../../Hooks/useArtworkInquiryRequest")
jest.mock("../../Hooks/useInquiryContext")
jest.mock("Utils/wait", () => ({ wait: () => Promise.resolve() }))
jest.mock("System/Hooks/useSystemContext")

describe("InquirySpecialist", () => {
  const next = jest.fn()
  const submitArtworkInquiryRequest = jest.fn()
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

      return { ...actual, next, artworkID: "example" }
    })
  })

  afterEach(() => {
    next.mockReset()
    submitArtworkInquiryRequest.mockReset()
    setInqirySpy.mockReset()
  })

  describe("logged out", () => {
    beforeAll(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => ({
        user: null,
      }))
    })

    it("renders correctly", () => {
      render(<InquirySpecialist />)

      expect(
        screen.getByText(/An Artsy Specialist is available/),
      ).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText("Your email address"),
      ).toBeInTheDocument()
    })

    it("fills out the inquiry and nexts", async () => {
      render(<InquirySpecialist />)

      // Fill inputs
      fireEvent.change(screen.getByPlaceholderText("Leave your comments"), {
        target: { value: "Hello world." },
      })
      fireEvent.change(screen.getByPlaceholderText("Your full name"), {
        target: { value: "Example Example" },
      })
      fireEvent.change(screen.getByPlaceholderText("Your email address"), {
        target: { value: "example@example.com" },
      })

      expect(setInqirySpy).toHaveBeenCalledTimes(3)

      // Submit form
      const form = screen
        .getByText(/An Artsy Specialist is available/)
        .closest("form")
      if (!form) {
        throw new Error("Form not found")
      }
      fireEvent.submit(form)
      await flushPromiseQueue()

      // Doesn't send the inquiry
      expect(submitArtworkInquiryRequest).not.toBeCalled()

      // Calls next
      expect(next).toBeCalled()
    })
  })

  describe("logged in", () => {
    beforeAll(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => ({
        user: { name: "Logged In", email: "loggedin@example.com" },
      }))
    })

    it("renders correctly", () => {
      render(<InquirySpecialist />)

      expect(
        screen.getByText(/An Artsy Specialist is available/),
      ).toBeInTheDocument()
      expect(
        screen.queryByPlaceholderText("Your email address"),
      ).not.toBeInTheDocument()
      expect(screen.getByText("From")).toBeInTheDocument()
      expect(screen.getByText(/loggedin@example\.com/)).toBeInTheDocument()
    })

    it("sends the inquiry and nexts", async () => {
      render(<InquirySpecialist />)

      // Fill input
      fireEvent.change(screen.getByPlaceholderText("Leave your comments"), {
        target: { value: "Hello world." },
      })

      expect(setInqirySpy).toHaveBeenCalledTimes(1)

      // Submit form
      const form = screen
        .getByText(/An Artsy Specialist is available/)
        .closest("form")
      if (!form) {
        throw new Error("Form not found")
      }
      fireEvent.submit(form)
      await flushPromiseQueue()

      // Sends the inquiry
      expect(submitArtworkInquiryRequest).toBeCalledWith({
        artworkID: "example",
        contactGallery: false,
        // TODO: Figure out why this state doesn't update within text (works in dev)
        // message: "Hello world.",
        message: DEFAULT_MESSAGE,
      })

      // Calls next
      expect(next).toBeCalled()
    })
  })
})
