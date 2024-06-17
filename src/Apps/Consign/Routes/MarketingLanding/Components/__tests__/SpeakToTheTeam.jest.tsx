import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SpeakToTheTeam } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SpeakToTheTeam"

jest.mock("react-tracking")
jest.mock("System/Hooks/useSystemContext")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerType: "sell",
  })),
}))

const trackEvent = useTracking as jest.Mock

describe("SpeakToTheTeam", () => {
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
    render(<SpeakToTheTeam />)

    expect(
      screen.getByText(
        "Selling multiple artworks? Get in touch to connect with a specialist."
      )
    ).toBeInTheDocument()
    expect(screen.getByText("Get in Touch")).toBeInTheDocument()
  })

  describe("Get in Touch button", () => {
    it("tracks click", () => {
      render(<SpeakToTheTeam />)

      fireEvent.click(screen.getByTestId("get-in-touch-button"))

      expect(trackEvent).toHaveBeenCalled()
      expect(trackEvent).toHaveBeenCalledWith({
        action: "tappedConsignmentInquiry",
        context_module: "sellSpeakToTheTeam",
        context_page_owner_type: "sell",
        label: "Get in Touch",
        user_id: "user-id",
        user_email: "user-email@artsy.net",
      })
    })

    it("links out to submission flow", () => {
      render(<SpeakToTheTeam />)

      const link = screen.getByTestId("get-in-touch-button")

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent("Get in Touch")
      expect(link).toHaveAttribute("href", "/sell/inquiry")
    })

    it("links out to email provider", () => {
      render(<SpeakToTheTeam />)

      const link = screen.getByTestId("get-in-touch-button")

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent("Get in Touch")
      expect(link).toHaveAttribute("href", "/sell/inquiry")
    })
  })
})
