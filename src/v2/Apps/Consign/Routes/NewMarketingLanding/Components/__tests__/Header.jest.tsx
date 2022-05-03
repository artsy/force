import { Header } from "../Header"
import { fireEvent, render, screen } from "@testing-library/react"
import { useTracking } from "v2/System/Analytics"

jest.mock("v2/System/Analytics/useTracking")

jest.mock("v2/System/Analytics/AnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerType: "sell",
  })),
}))

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(() => ({
    match: { params: { id: "1" } },
  })),
}))

const trackEvent = useTracking as jest.Mock

describe("Header", () => {
  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("links out to submission flow", () => {
    render(<Header />)

    const link = screen.getByRole("link")

    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent("Submit an Artwork")
    expect(link).toHaveAttribute("href", "/consign/submission/artwork-details")
  })

  it("tracks click", () => {
    render(<Header />)

    fireEvent.click(screen.getByRole("link"))

    expect(trackEvent).toHaveBeenCalled()
    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedSubmitAnArtwork",
      context_module: "Header",
      context_page_owner_type: "sell",
      label: "Submit an Artwork",
      destination_path: "/consign/submission/artwork-details",
    })
  })
})
