import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/useSystemContext"
import { SWAFooter } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SWAFooter"

jest.mock("react-tracking")
jest.mock("System/useSystemContext")
jest.mock("System/Analytics/AnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerType: "sell",
  })),
}))

const trackEvent = useTracking as jest.Mock

describe("SWAFooter", () => {
  beforeEach(() => {
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
    render(<SWAFooter />)

    expect(
      screen.getByText(
        "Sell with Artsy is the simple, contemporary way to sell art from your collection."
      )
    ).toBeInTheDocument()
    expect(screen.getByText("Start Selling")).toBeInTheDocument()
  })

  describe("Start Selling button", () => {
    it("links out to submission flow", () => {
      render(<SWAFooter />)

      const link = screen.getByTestId("start-selling-button")

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent("Start Selling")
      expect(link).toHaveAttribute("href", "/sell/submission")
    })

    it("tracks click", () => {
      render(<SWAFooter />)

      fireEvent.click(screen.getByTestId("start-selling-button"))

      expect(trackEvent).toHaveBeenCalled()
      expect(trackEvent).toHaveBeenCalledWith({
        action: "tappedConsign",
        context_module: "SWAFooter",
        context_page_owner_type: "sell",
        label: "Start Selling",
        destination_path: "/sell/submission",
        user_id: "user-id",
      })
    })
  })
})
