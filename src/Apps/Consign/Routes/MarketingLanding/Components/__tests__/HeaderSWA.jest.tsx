import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/useSystemContext"
import { HeaderSWA } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/HeaderSWA"

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
        "swa-inquiry-flow": { flagEnabled: true },
      },
    }))
  })

  it("renders correctly", () => {
    render(<HeaderSWA />)

    expect(
      screen.getByText("Sell art from your collection")
    ).toBeInTheDocument()
    expect(screen.getByText("Start Selling")).toBeInTheDocument()
    expect(screen.getByText("Get in Touch")).toBeInTheDocument()
  })

  describe("Start Selling button", () => {
    it("links out to submission flow", () => {
      render(<HeaderSWA />)

      const link = screen.getByTestId("start-selling-button")

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent("Start Selling")
      expect(link).toHaveAttribute("href", "/sell/submission")
    })

    it("tracks click", () => {
      render(<HeaderSWA />)

      fireEvent.click(screen.getByTestId("start-selling-button"))

      expect(trackEvent).toHaveBeenCalled()
      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedStartSelling",
        context_module: "Header",
        context_page_owner_type: "sell",
        label: "Start Selling",
        destination_path: "/sell/submission",
        user_id: "user-id",
      })
    })
  })

  describe("Get in Touch button", () => {
    it("tracks click", () => {
      render(<HeaderSWA />)

      fireEvent.click(screen.getByTestId("get-in-touch-button"))

      expect(trackEvent).toHaveBeenCalled()
      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedGetInTouch",
        context_module: "Header",
        context_page_owner_type: "sell",
        label: "Get in Touch",
        user_id: "user-id",
        user_email: "user-email@artsy.net",
      })
    })

    it("links out to email provider", () => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => ({
        user: { id: "user-id", email: "user-email@artsy.net" },
        featureFlags: {
          "cx-swa-landing-page-redesign-2023": { flagEnabled: true },
          "swa-inquiry-flow": { flagEnabled: false },
        },
      }))

      render(<HeaderSWA />)

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
