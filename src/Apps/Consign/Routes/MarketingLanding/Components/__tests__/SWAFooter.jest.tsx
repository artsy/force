import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { SWAFooter } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/SWAFooter"

jest.mock("react-tracking")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerType: "sell",
  })),
}))
const trackEvent = useTracking as jest.Mock

describe("SWAFooter", () => {
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
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
        context_module: "Footer",
        context_page_owner_type: "sell",
        label: "Start Selling",
        destination_path: "/sell/submission",
      })
    })
  })
})
