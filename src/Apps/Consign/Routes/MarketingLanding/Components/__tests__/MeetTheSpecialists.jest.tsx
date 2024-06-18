import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { MeetTheSpecialists } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/MeetTheSpecialists"

jest.mock("react-tracking")
jest.mock("System/Hooks/useSystemContext")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerType: "sell",
  })),
}))

const mockRouterPush = jest.fn()
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(() => ({
    push: mockRouterPush,
    match: { params: { id: "1" } },
  })),
}))

const trackEvent = useTracking as jest.Mock

describe("MeetTheSpecialists", () => {
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      user: { id: "user-id", email: "user-email@artsy.net" },
    }))
  })

  it("renders correctly", () => {
    render(<MeetTheSpecialists />)

    expect(screen.getByText("Meet the specialists")).toBeInTheDocument()
    expect(screen.getByText("Get in Touch")).toBeInTheDocument()
  })

  describe("Get in Touch button", () => {
    it("links out to submission flow", () => {
      render(<MeetTheSpecialists />)

      const link = screen.getByTestId("get-in-touch-button")

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent("Get in Touch")
      expect(link).toHaveAttribute("href", "/sell/inquiry")
    })

    it("tracks click", () => {
      render(<MeetTheSpecialists />)

      fireEvent.click(screen.getByTestId("get-in-touch-button"))

      expect(trackEvent).toHaveBeenCalled()
      expect(trackEvent).toHaveBeenCalledWith({
        action: "tappedConsignmentInquiry",
        context_module: "sellMeetTheSpecialists",
        context_page_owner_type: "sell",
        label: "Get in Touch",
        user_id: "user-id",
        user_email: "user-email@artsy.net",
      })
    })

    it("links out to email provider", () => {
      render(<MeetTheSpecialists />)

      const link = screen.getByTestId("get-in-touch-button")

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent("Get in Touch")
      expect(link).toHaveAttribute("href", "/sell/inquiry")
    })
  })

  describe("Contact the specialist button", () => {
    it("links out to email provider", () => {
      render(<MeetTheSpecialists />)

      const link = screen.getByTestId("get-in-touch-button-Jessica") // here

      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute(
        "href",
        "/sell/inquiry/jessica@artsymail.com"
      )
    })
  })
})
