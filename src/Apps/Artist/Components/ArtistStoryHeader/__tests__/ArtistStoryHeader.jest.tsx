import { fireEvent, screen } from "@testing-library/react"
import { ArtistStoryHeader } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryHeader"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistStoryHeader_Test_Query } from "__generated__/ArtistStoryHeader_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "artist-id",
    contextPageOwnerSlug: "heidi-lau",
    contextPageOwnerType: "artist",
  })),
}))
jest.mock("Components/FollowButton/FollowArtistButton", () => ({
  FollowArtistButtonQueryRenderer: () => <button type="button">Follow</button>,
}))
jest.mock(
  "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist",
  () => ({
    ProgressiveOnboardingFollowArtist: ({ children }) => children,
  }),
)
jest.mock(
  "Apps/Artist/Components/ArtistHeader/ArtistHeaderEditorialItem",
  () => ({
    ArtistHeaderEditorialItem: () => <div data-testid="editorial-item" />,
  }),
)
jest.mock("Components/LoopingVimeoVideo/LoopingVimeoVideo", () => ({
  LoopingVimeoVideo: ({ playerUrl, posterUrl, onPlay, onPause, onError }) => (
    <div
      data-testid="looping-video"
      data-player-url={playerUrl}
      data-poster-url={posterUrl ?? ""}
    >
      <button type="button" onClick={onPlay}>
        mock play
      </button>
      <button type="button" onClick={onPause}>
        mock pause
      </button>
      <button type="button" onClick={onError}>
        mock error
      </button>
    </div>
  ),
}))

const trackEvent = jest.fn()

const { renderWithRelay } = setupTestWrapperTL<ArtistStoryHeader_Test_Query>({
  Component: ArtistStoryHeader,
  query: graphql`
    query ArtistStoryHeader_Test_Query @relay_test_operation {
      artist(id: "heidi-lau") {
        ...ArtistStoryHeader_artist
      }
    }
  `,
})

const VIDEO = {
  video: {
    playerUrl: "https://player.vimeo.com/video/1",
    aspectRatio: 1.78,
    title: "Header",
  },
}

const IMAGE = {
  altText: "Heidi Lau among her ceramics",
  credit: "Photo: Studio",
  image: { resized: { src: "https://example.com/header.jpg", srcSet: "" } },
}

const BIO = "<p>Opening paragraph.</p><p>Second paragraph.</p>"

const render = ({
  story = {},
  artist = {},
}: {
  story?: Record<string, unknown> | null
  artist?: Record<string, unknown>
} = {}) => {
  return renderWithRelay({
    Artist: () => ({
      internalID: "artist-id",
      name: "Heidi Lau",
      formattedNationalityAndBirthday: "Chinese American, b. 1987",
      vanguardYear: "2026",
      instagramHandle: null,
      counts: { follows: 1200 },
      biographyBlurb: { text: BIO, credit: null },
      featuredStory:
        story === null
          ? null
          : {
              headerVideo: null,
              headerImage: null,
              pullQuote: { text: "Beautiful and grotesque", attribution: null },
              ...story,
            },
      movementGenes: [],
      mediumGenes: [],
      verifiedRepresentatives: [],
      articlesConnection: { totalCount: 0, edges: [] },
      ...artist,
    }),
  })
}

beforeEach(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  trackEvent.mockClear()
})

describe("ArtistStoryHeader", () => {
  it("renders nothing without a Story", () => {
    render({ story: null })

    expect(screen.queryByTestId("artist-story-header")).not.toBeInTheDocument()
    expect(screen.queryByTestId("artist-story-intro")).not.toBeInTheDocument()
  })

  describe("media", () => {
    it("shows the Header Video, with the Header Image as its poster", () => {
      render({ story: { headerVideo: VIDEO, headerImage: IMAGE } })

      const video = screen.getByTestId("looping-video")

      expect(video).toHaveAttribute("data-player-url", VIDEO.video.playerUrl)
      expect(video).toHaveAttribute(
        "data-poster-url",
        "https://example.com/header.jpg",
      )
      expect(screen.queryByAltText(IMAGE.altText)).not.toBeInTheDocument()
    })

    it("shows the Header Video with no poster when there is no Header Image", () => {
      render({ story: { headerVideo: VIDEO } })

      expect(screen.getByTestId("looping-video")).toHaveAttribute(
        "data-poster-url",
        "",
      )
    })

    it("fills the space with the Header Image, its alt text and credit, without a video", () => {
      render({ story: { headerImage: IMAGE } })

      expect(screen.queryByTestId("looping-video")).not.toBeInTheDocument()
      expect(screen.getByAltText(IMAGE.altText)).toHaveAttribute(
        "src",
        "https://example.com/header.jpg",
      )
      expect(screen.getByText("Photo: Studio")).toBeInTheDocument()
    })

    it("shows no media with neither", () => {
      render()

      expect(screen.queryByTestId("looping-video")).not.toBeInTheDocument()
      expect(screen.queryByRole("img")).not.toBeInTheDocument()
    })

    it("shows the Header Image in place of a broken video", () => {
      render({ story: { headerVideo: VIDEO, headerImage: IMAGE } })

      fireEvent.click(screen.getByRole("button", { name: "mock error" }))

      expect(screen.queryByTestId("looping-video")).not.toBeInTheDocument()
      expect(
        screen.getByAltText("Heidi Lau among her ceramics"),
      ).toBeInTheDocument()
      expect(screen.getByText("Photo: Studio")).toBeInTheDocument()
    })

    it("keeps the video when it breaks and there is no Header Image", () => {
      render({ story: { headerVideo: VIDEO } })

      fireEvent.click(screen.getByRole("button", { name: "mock error" }))

      expect(screen.getByTestId("looping-video")).toBeInTheDocument()
    })

    it("tracks play and pause of the Header Video", () => {
      render({ story: { headerVideo: VIDEO } })

      fireEvent.click(screen.getByRole("button", { name: "mock pause" }))

      expect(trackEvent).toHaveBeenLastCalledWith({
        action: "clickedPauseVideo",
        context_module: "artistHeaderVideo",
        context_owner_type: "artist",
        context_owner_id: "artist-id",
        context_owner_slug: "heidi-lau",
      })

      fireEvent.click(screen.getByRole("button", { name: "mock play" }))

      expect(trackEvent).toHaveBeenLastCalledWith({
        action: "clickedPlayVideo",
        context_module: "artistHeaderVideo",
        context_owner_type: "artist",
        context_owner_id: "artist-id",
        context_owner_slug: "heidi-lau",
      })
    })
  })

  describe("Vanguard badge", () => {
    it("links to the Vanguard collection", () => {
      render({ story: { headerVideo: VIDEO } })

      expect(
        screen.getByRole("link", { name: "2026 Vanguard Artist" }),
      ).toHaveAttribute("href", "/collection/artsy-vanguard-artists")
    })

    it("tracks a click on the badge", () => {
      render({ story: { headerVideo: VIDEO } })

      fireEvent.click(
        screen.getByRole("link", { name: "2026 Vanguard Artist" }),
      )

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedVanguardBadge",
        context_module: "artistVanguardBadge",
        context_page_owner_type: "artist",
        context_page_owner_id: "artist-id",
        context_page_owner_slug: "heidi-lau",
        destination_page_owner_type: "collection",
        destination_page_owner_slug: "artsy-vanguard-artists",
      })
    })

    it("drops out without a Vanguard year", () => {
      render({ story: { headerVideo: VIDEO }, artist: { vanguardYear: null } })

      expect(screen.queryByText(/Vanguard Artist/)).not.toBeInTheDocument()
      expect(screen.getByText("Heidi Lau")).toBeInTheDocument()
    })
  })

  describe("Pull Quote", () => {
    it("shows the quote with its attribution", () => {
      render({
        story: {
          headerVideo: VIDEO,
          pullQuote: { text: "Beautiful and grotesque", attribution: "Heidi" },
        },
      })

      expect(screen.getByText("“Beautiful and grotesque”")).toBeInTheDocument()
      expect(screen.getByText("Heidi")).toBeInTheDocument()
    })

    it("drops out without a Pull Quote", () => {
      render({ story: { headerVideo: VIDEO, pullQuote: null } })

      expect(screen.queryByText(/Beautiful/)).not.toBeInTheDocument()
      expect(screen.getByText("Opening paragraph.")).toBeInTheDocument()
    })
  })

  describe("Featured representation", () => {
    const GALLERY = {
      partner: {
        internalID: "partner-id",
        name: "Galerie Knust Kunz",
        href: "/partner/knust-kunz-gallery-editions-1",
        profile: null,
      },
    }

    it("links to each verified representative and tracks the click", () => {
      render({
        story: { headerVideo: VIDEO },
        artist: { verifiedRepresentatives: [GALLERY] },
      })

      expect(screen.getByText("Featured representation")).toBeInTheDocument()

      const link = screen.getByRole("link", { name: "Galerie Knust Kunz" })
      expect(link).toHaveAttribute(
        "href",
        "/partner/knust-kunz-gallery-editions-1",
      )

      fireEvent.click(link)

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedVerifiedRepresentative",
        context_module: "artistHeader",
        context_page_owner_id: "artist-id",
        context_page_owner_type: "artist",
        destination_page_owner_id: "partner-id",
        destination_page_owner_type: "partner",
      })
    })

    it("drops out without a verified representative", () => {
      render({ story: { headerVideo: VIDEO } })

      expect(
        screen.queryByText("Featured representation"),
      ).not.toBeInTheDocument()
    })
  })

  describe("Instagram link", () => {
    it("links to the artist's Instagram", () => {
      render({
        story: { headerVideo: VIDEO },
        artist: { instagramHandle: "heidilau" },
      })

      expect(
        screen.getByRole("link", { name: "Visit heidilau on Instagram" }),
      ).toBeInTheDocument()
    })

    it("drops out without a handle", () => {
      render({ story: { headerVideo: VIDEO } })

      expect(
        screen.queryByRole("link", { name: /Instagram/ }),
      ).not.toBeInTheDocument()
    })
  })

  describe("Editorial rail", () => {
    it("shows the articles below the intro", () => {
      render({
        story: { headerVideo: VIDEO },
        artist: {
          articlesConnection: {
            totalCount: 1,
            edges: [{ node: { internalID: "article-1" } }],
          },
        },
      })

      expect(
        screen.getByText("Artsy Editorial Featuring Heidi Lau"),
      ).toBeInTheDocument()
      expect(screen.getByTestId("editorial-item")).toBeInTheDocument()
    })

    it("drops out without articles", () => {
      render({ story: { headerVideo: VIDEO } })

      expect(
        screen.queryByText(/Artsy Editorial Featuring/),
      ).not.toBeInTheDocument()
    })
  })

  describe("intro", () => {
    // jsdom has no layout, so ReadMore only sees clamped text when we say so.
    const spies: jest.SpyInstance[] = []

    const mockOverflowingBiography = () => {
      spies.push(
        jest
          .spyOn(HTMLElement.prototype, "scrollHeight", "get")
          .mockReturnValue(200),
        jest
          .spyOn(HTMLElement.prototype, "clientHeight", "get")
          .mockReturnValue(100),
      )
    }

    afterEach(() => {
      spies.splice(0).forEach(spy => {
        spy.mockRestore()
      })
    })

    it("clamps the Biography with Read more, and tracks the toggle", () => {
      mockOverflowingBiography()
      render({ story: { headerVideo: VIDEO } })

      const readMore = screen.getByRole("button", { name: "Read more" })
      expect(readMore).toHaveAttribute("aria-expanded", "false")

      fireEvent.click(readMore)

      expect(screen.getByRole("button", { name: "Read less" })).toHaveAttribute(
        "aria-expanded",
        "true",
      )
      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({ action: "toggledArtistBio", expand: true }),
      )

      fireEvent.click(screen.getByRole("button", { name: "Read less" }))

      expect(trackEvent).toHaveBeenLastCalledWith(
        expect.objectContaining({ action: "toggledArtistBio", expand: false }),
      )
    })

    it("shows Styles and Techniques outside Read more", () => {
      render({
        story: { headerVideo: VIDEO },
        artist: {
          movementGenes: [
            {
              internalID: "gene-1",
              name: "Abstract Art",
              slug: "abstract-art",
            },
          ],
          mediumGenes: [
            { internalID: "gene-2", name: "Sculpture", slug: "sculpture" },
          ],
        },
      })

      expect(screen.getByText("Styles")).toBeInTheDocument()
      expect(screen.getByText("Abstract Art")).toBeInTheDocument()
      expect(screen.getByText("Techniques")).toBeInTheDocument()
      expect(screen.getByText("Sculpture")).toBeInTheDocument()
    })

    it("shows the Biography credit with the text", () => {
      render({
        story: { headerVideo: VIDEO },
        artist: {
          biographyBlurb: { text: BIO, credit: "<p>Submitted by Gallery</p>" },
        },
      })

      expect(screen.getByText("Submitted by Gallery")).toBeInTheDocument()
    })

    it("has no Read more when the Biography fits", () => {
      render({
        story: { headerVideo: VIDEO },
        artist: { biographyBlurb: { text: "<p>Only one.</p>", credit: null } },
      })

      expect(screen.getByText("Only one.")).toBeInTheDocument()
      expect(
        screen.queryByRole("button", { name: "Read more" }),
      ).not.toBeInTheDocument()
    })

    it("shows the Pull Quote alone without a Biography", () => {
      render({
        story: { headerVideo: VIDEO },
        artist: { biographyBlurb: null },
      })

      expect(screen.getByText("“Beautiful and grotesque”")).toBeInTheDocument()
      expect(
        screen.queryByRole("button", { name: "Read more" }),
      ).not.toBeInTheDocument()
    })
  })
})
