import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/useSystemContext"
import { SpeakToTheTeam } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SpeakToTheTeam"

jest.mock("react-tracking")
// TODO: Remove feature flag mock when feature flag is removed
jest.mock("System/useSystemContext")
jest.mock("System/Analytics/AnalyticsContext", () => ({
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
      featureFlags: {
        "cx-swa-landing-page-redesign-2023": { flagEnabled: true },
        "swa-inquiry-flow": { flagEnabled: true },
      },
    }))
  })

  it("renders correctly", () => {
    render(<SpeakToTheTeam />)

    expect(
      screen.getByText("Interested in selling multiple artworks?")
    ).toBeInTheDocument()
    expect(screen.getByText("Speak with our team.")).toBeInTheDocument()
  })

  describe("Get in Touch button", () => {
    it("tracks click", () => {
      render(<SpeakToTheTeam />)

      fireEvent.click(screen.getByTestId("get-in-touch-button"))

      expect(trackEvent).toHaveBeenCalled()
      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedGetInTouch",
        context_module: "SpeakToTheTeam",
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
      ;(useSystemContext as jest.Mock).mockImplementation(() => ({
        featureFlags: {
          "cx-swa-landing-page-redesign-2023": { flagEnabled: true },
          "swa-inquiry-flow": { flagEnabled: false },
        },
      }))
      render(<SpeakToTheTeam />)

      const link = screen.getByTestId("get-in-touch-button")

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent("Get in Touch")
      expect(link).toHaveAttribute(
        "href",
        "mailto:sell@artsy.net?subject=Inquiry about selling with Artsy"
      )
    })
  })
})
