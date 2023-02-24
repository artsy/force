import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/useSystemContext"
import { HowItWorksSteps } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/HowItWorksSteps"

jest.mock("react-tracking")
// TODO: Remove feature flag mock when feature flag is removed
jest.mock("System/useSystemContext")
jest.mock("System/Analytics/AnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerType: "sell",
  })),
}))
jest.mock("System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({
    match: { params: { id: "1" } },
  })),
}))

const trackEvent = useTracking as jest.Mock

describe("HeaderSWA", () => {
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
      },
    }))
  })

  it("renders correctly", () => {
    render(<HowItWorksSteps />)

    expect(screen.getByText("How it works")).toBeInTheDocument()
    expect(screen.getByText("Submit your artwork")).toBeInTheDocument()
    expect(screen.getByText("Start Selling")).toBeInTheDocument()
  })

  describe("Start Selling button", () => {
    it("links out to submission flow", () => {
      render(<HowItWorksSteps />)

      const link = screen.getByTestId("start-selling-button")

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent("Start Selling")
      expect(link).toHaveAttribute("href", "/sell/submission")
    })

    it("tracks click", () => {
      render(<HowItWorksSteps />)

      fireEvent.click(screen.getByTestId("start-selling-button"))

      expect(trackEvent).toHaveBeenCalled()
      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedStartSelling",
        context_module: "HowItWorks",
        context_page_owner_type: "sell",
        label: "Start Selling",
        destination_path: "/sell/submission",
        user_id: "user-id",
      })
    })
  })
})
