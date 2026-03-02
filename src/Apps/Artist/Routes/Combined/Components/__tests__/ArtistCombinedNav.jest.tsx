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

  it("does not render editorial tab by default", () => {
    render(
      <ArtistCombinedNav
        waitUntil={waitUntil}
        navigating={{ artworks: false, auction: false, about: false }}
      />,
    )

    expect(screen.queryByText("Editorial")).not.toBeInTheDocument()
  })

  it("renders editorial tab and jumps to editorial section", async () => {
    render(
      <ArtistCombinedNav
        waitUntil={waitUntil}
        navigating={{ artworks: false, auction: false, about: false }}
        showEditorialTab
      />,
    )

    fireEvent.click(screen.getByText("Editorial"))

    await waitFor(() => {
      expect(waitUntil).toHaveBeenCalledWith("about")
      expect(mockJumpTo).toHaveBeenCalledWith("artistEditorialTop")
      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: "clickedHeader",
        context_module: "artistHeader",
        context_page_owner_type: "artist",
        subject: "editorial",
      })
    })
  })
})
