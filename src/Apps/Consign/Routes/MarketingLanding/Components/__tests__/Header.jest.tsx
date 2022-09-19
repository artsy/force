import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System"
import { Header } from "../Header"

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

describe("Header", () => {
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      featureFlags: {
        "get-in-touch-flow-web": { flagEnabled: true },
      },
    }))
  })

  it("links out to submission flow", () => {
    render(<Header />)

    const link = screen.getByTestId("submit-artwork-button")

    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent("Submit an Artwork")
    expect(link).toHaveAttribute("href", "/sell/submission/artwork-details")
  })

  it("tracks click", () => {
    render(<Header />)

    fireEvent.click(screen.getByTestId("submit-artwork-button"))

    expect(trackEvent).toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedSubmitAnArtwork",
      context_module: "Header",
      context_page_owner_type: "sell",
      label: "Submit an Artwork",
      destination_path: "/sell/submission/artwork-details",
    })
  })

  describe("when get-in-touch-flow-web feature is turned on", () => {
    beforeAll(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => ({
        featureFlags: {
          "get-in-touch-flow-web": { flagEnabled: true },
        },
      }))
    })

    it("links out to get in touch flow", () => {
      render(<Header />)

      const link = screen.getByTestId("get-in-touch-button")

      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent("Get in Touch")
    })
  })
})
