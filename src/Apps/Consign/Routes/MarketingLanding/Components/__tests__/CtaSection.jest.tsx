import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System"
import { CtaSection } from "Apps/Consign/Routes/MarketingLanding/Components/CtaSection"

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

describe("CtaSection", () => {
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      user: { id: "user-id", email: "user-email@artsy.net" },
      featureFlags: {
        "get-in-touch-flow-web": { flagEnabled: true },
      },
    }))
  })

  describe("Submit an Artwork button", () => {
    it("links out to submission flow", () => {
      render(<CtaSection />)

      const link = screen.getByTestId("submit-artwork-button")

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent("Submit an Artwork")
      expect(link).toHaveAttribute("href", "/sell/submission")
    })

    it("tracks click", () => {
      render(<CtaSection />)

      fireEvent.click(screen.getByTestId("submit-artwork-button"))

      expect(trackEvent).toHaveBeenCalled()
      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedSubmitAnArtwork",
        context_module: "Bottom",
        context_page_owner_type: "sell",
        label: "Submit an Artwork",
        destination_path: "/sell/submission",
        user_id: "user-id",
      })
    })
  })

  describe("Get in Touch button", () => {
    it("links out to get in touch flow", () => {
      render(<CtaSection />)

      const link = screen.getByTestId("get-in-touch-button")

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent("Get in Touch")
    })

    it("tracks click", () => {
      render(<CtaSection />)

      fireEvent.click(screen.getByTestId("get-in-touch-button"))

      expect(trackEvent).toHaveBeenCalled()
      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedGetInTouch",
        context_module: "Bottom",
        context_page_owner_type: "sell",
        label: "Get in Touch",
        user_id: "user-id",
        user_email: "user-email@artsy.net",
      })
    })
  })
})
