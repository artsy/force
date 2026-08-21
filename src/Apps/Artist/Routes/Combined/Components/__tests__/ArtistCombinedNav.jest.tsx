import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { ArtistCombinedNav } from "Apps/Artist/Routes/Combined/Components/ArtistCombinedNav"
import { useTracking } from "react-tracking"

const mockJumpTo = jest.fn()
const mockTrackEvent = jest.fn()

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerType: "artist",
  })),
}))

jest.mock("react-tracking", () => ({
  useTracking: jest.fn(() => ({
    trackEvent: mockTrackEvent,
  })),
}))

jest.mock("Utils/Hooks/useJump", () => ({
  useJump: jest.fn(() => ({
    jumpTo: mockJumpTo,
  })),
}))

jest.mock("Utils/Hooks/useSectionNav", () => ({
  useSectionNav: jest.fn(() => ({
    active: "artistArtworksTop",
  })),
}))

jest.mock("Components/Sticky", () => ({
  Sticky: ({ children }: any) => children({ scrollDirection: "down" }),
  StickyNavRetractionSentinel: () => null,
}))

jest.mock("Components/Sticky/useNavInteractionBlocker", () => ({
  useNavInteractionBlocker: jest.fn(() => ({
    containerProps: {},
    NavBlocker: () => null,
  })),
}))

jest.mock("Components/Sticky/useStickyBackdrop", () => ({
  useStickyBackdrop: jest.fn(() => ({
    down: {},
    up: {},
  })),
}))

const NAVIGATING = {
  artworks: false,
  auction: false,
  about: false,
  editorial: false,
  social: false,
}

describe("ArtistCombinedNav", () => {
  const waitUntil = jest.fn().mockResolvedValue(undefined)

  beforeEach(() => {
    mockJumpTo.mockReset()
    mockTrackEvent.mockReset()
    waitUntil.mockClear()
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: mockTrackEvent,
    }))
  })

  it("renders the tabs in order, with Social last", () => {
    render(<ArtistCombinedNav waitUntil={waitUntil} navigating={NAVIGATING} />)

    const labels = screen
      .getAllByRole("button")
      .map(tab => tab.textContent)
      .filter(Boolean)

    expect(labels).toEqual([
      "Artworks",
      "Auction Results",
      "About",
      "Editorial",
      "Social",
    ])
  })

  it("renders editorial tab and jumps to editorial section", async () => {
    render(<ArtistCombinedNav waitUntil={waitUntil} navigating={NAVIGATING} />)

    fireEvent.click(screen.getByText("Editorial"))

    await waitFor(() => {
      expect(waitUntil).toHaveBeenCalledWith("editorial")
      expect(mockJumpTo).toHaveBeenCalledWith("artistEditorialTop")
      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: "clickedHeader",
        context_module: "artistHeader",
        context_page_owner_type: "artist",
        subject: "editorial",
      })
    })
  })

  it("renders the Social tab and jumps to the Social section", async () => {
    render(<ArtistCombinedNav waitUntil={waitUntil} navigating={NAVIGATING} />)

    fireEvent.click(screen.getByText("Social"))

    await waitFor(() => {
      expect(waitUntil).toHaveBeenCalledWith("social")
      expect(mockJumpTo).toHaveBeenCalledWith("artistSocialTop")
      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: "clickedHeader",
        context_module: "artistHeader",
        context_page_owner_type: "artist",
        subject: "social",
      })
    })
  })
})
