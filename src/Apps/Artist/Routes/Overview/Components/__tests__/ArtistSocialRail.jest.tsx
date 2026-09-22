import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { act, fireEvent, screen } from "@testing-library/react"
import { ArtistSocialRailFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistSocialRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { intersect } from "Utils/Hooks/__tests__/mockIntersectionObserver"
import type { ArtistSocialRailTestQuery } from "__generated__/ArtistSocialRailTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

const loggerError = jest.fn()

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))
jest.mock("Utils/logger", () => ({
  __esModule: true,
  default: () => ({
    log: jest.fn(),
    warn: jest.fn(),
    // Deferred so `loggerError` is initialised by the time a test calls it.
    error: (...args: unknown[]) => loggerError(...args),
  }),
}))
jest.mock("System/Hooks/useAnalyticsContext")
jest.unmock("react-relay")

const GEMINI_SRC =
  "https://d196wkiy8qx2u5.cloudfront.net?height=375&quality=85&resize_to=fill&src=https%3A%2F%2Fscontent-iad3-1.cdninstagram.com%2Fv%2Ffirst.jpg%3Foe%3D6AAF2200&width=300"

const { renderWithRelay } = setupTestWrapperTL<ArtistSocialRailTestQuery>({
  Component: ArtistSocialRailFragmentContainer,
  query: graphql`
    query ArtistSocialRailTestQuery @relay_test_operation {
      artist(id: "test") {
        ...ArtistSocialRail_artist
      }
    }
  `,
})

const mockTrackEvent = jest.fn()

describe("ArtistSocialRail", () => {
  beforeEach(() => {
    loggerError.mockClear()
    ;(useTracking as jest.Mock).mockReturnValue({ trackEvent: mockTrackEvent })
    ;(useAnalyticsContext as jest.Mock).mockReturnValue({
      contextPageOwnerType: OwnerType.artist,
      contextPageOwnerId: "4d8b926a4eb68a1b2c0000ae",
      contextPageOwnerSlug: "damien-hirst",
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders the header and image tiles that link to each Instagram post", () => {
    renderWithRelay({
      Artist: () => ({
        instagramMedia: [
          {
            internalID: "media-1",
            permalink: "https://www.instagram.com/p/first",
            caption: "First post",
            image: {
              cropped: {
                src: "https://example.com/1.jpg",
                srcSet: "https://example.com/1.jpg 1x",
              },
            },
          },
          {
            internalID: "media-2",
            permalink: "https://www.instagram.com/p/second",
            caption: "Second post",
            image: {
              cropped: {
                src: "https://example.com/2.jpg",
                srcSet: "https://example.com/2.jpg 1x",
              },
            },
          },
        ],
      }),
    })

    expect(screen.getByText("Social")).toBeInTheDocument()

    const first = screen.getByAltText("First post")
    const second = screen.getByAltText("Second post")
    expect(first.closest("a")).toHaveAttribute(
      "href",
      "https://www.instagram.com/p/first",
    )
    expect(second.closest("a")).toHaveAttribute(
      "href",
      "https://www.instagram.com/p/second",
    )

    expect(
      screen.queryByText(
        "We’ll update this area when more information is available.",
      ),
    ).not.toBeInTheDocument()
  })

  it("renders a skeleton behind each tile until its image loads", () => {
    renderWithRelay({
      Artist: () => ({
        instagramMedia: [
          {
            internalID: "media-1",
            permalink: "https://www.instagram.com/p/first",
            caption: "First post",
            image: {
              cropped: {
                src: "https://example.com/1.jpg",
                srcSet: "https://example.com/1.jpg 1x",
              },
            },
          },
        ],
      }),
    })

    expect(screen.getByTestId("tile-skeleton")).toBeInTheDocument()

    fireEvent.load(screen.getByAltText("First post"))

    expect(screen.queryByTestId("tile-skeleton")).not.toBeInTheDocument()
  })

  it("reports a broken tile", () => {
    renderWithRelay({
      Artist: () => ({
        instagramMedia: [
          {
            internalID: "media-1",
            permalink: "https://www.instagram.com/p/first",
            caption: "First post",
            image: { cropped: { src: GEMINI_SRC, srcSet: null } },
          },
        ],
      }),
    })

    fireEvent.error(screen.getByAltText("First post"))

    expect(loggerError).toHaveBeenCalledTimes(1)

    const [error] = loggerError.mock.calls[0]
    expect(error.message).toEqual(
      "[ArtistSocialRail] Gemini image failed to load",
    )
    expect(error.metadata).toEqual({
      instagramPostId: "media-1",
      src: GEMINI_SRC,
    })

    // The skeleton still clears so a broken tile does not spin forever.
    expect(screen.queryByTestId("tile-skeleton")).not.toBeInTheDocument()
  })

  it("does not report anything when a tile loads successfully", () => {
    renderWithRelay({
      Artist: () => ({
        instagramMedia: [
          {
            internalID: "media-1",
            permalink: "https://www.instagram.com/p/first",
            caption: "First post",
            image: { cropped: { src: GEMINI_SRC, srcSet: null } },
          },
        ],
      }),
    })

    fireEvent.load(screen.getByAltText("First post"))

    expect(loggerError).not.toHaveBeenCalled()
  })

  it("renders the empty state when there is no Instagram media", () => {
    renderWithRelay({
      Artist: () => ({
        instagramMedia: [],
      }),
    })

    expect(screen.getByText("Social")).toBeInTheDocument()
    expect(
      screen.getByText("We’ll update this area when new posts are available."),
    ).toBeInTheDocument()
    expect(screen.queryByText("Become a partner.")).not.toBeInTheDocument()
  })

  describe("tracking", () => {
    const MEDIA = [
      {
        internalID: "media-1",
        permalink: "https://www.instagram.com/p/first",
        caption: "First post",
        image: {
          cropped: { src: "https://example.com/1.jpg", srcSet: undefined },
        },
      },
      {
        internalID: "media-2",
        permalink: "https://www.instagram.com/p/second",
        caption: "Second post",
        image: {
          cropped: { src: "https://example.com/2.jpg", srcSet: undefined },
        },
      },
    ]

    it("tracks clickedSocialPost with the tile’s permalink", () => {
      renderWithRelay({ Artist: () => ({ instagramMedia: MEDIA }) })

      fireEvent.click(screen.getByAltText("Second post"))

      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: ActionType.clickedSocialPost,
        context_module: ContextModule.socialRail,
        context_page_owner_type: OwnerType.artist,
        context_page_owner_id: "4d8b926a4eb68a1b2c0000ae",
        context_page_owner_slug: "damien-hirst",
        destination_path: "https://www.instagram.com/p/second",
        service: "instagram",
      })
    })

    it("omits destination_path when the post has no permalink", () => {
      renderWithRelay({
        Artist: () => ({
          instagramMedia: [{ ...MEDIA[0], permalink: null }],
        }),
      })

      fireEvent.click(screen.getByAltText("First post"))

      expect(mockTrackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: ActionType.clickedSocialPost,
          destination_path: undefined,
        }),
      )
    })

    it("tracks railViewed once the rail has been in view long enough", () => {
      jest.useFakeTimers()

      renderWithRelay({ Artist: () => ({ instagramMedia: MEDIA }) })

      const rail = screen.getByTestId("artist-social-rail")

      act(() => intersect(rail, true))
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: ActionType.railViewed,
        context_module: ContextModule.socialRail,
        context_screen: OwnerType.artist,
      })

      jest.useRealTimers()
    })

    it("does not track railViewed for the empty state", () => {
      jest.useFakeTimers()

      renderWithRelay({ Artist: () => ({ instagramMedia: [] }) })

      const rail = screen.getByTestId("artist-social-rail")

      act(() => intersect(rail, true))
      act(() => {
        jest.advanceTimersByTime(1000)
      })

      expect(mockTrackEvent).not.toHaveBeenCalledWith(
        expect.objectContaining({ action: ActionType.railViewed }),
      )

      jest.useRealTimers()
    })
  })
})
