import { fireEvent, screen } from "@testing-library/react"
import { ArtistStoryHeader } from "Apps/Artist/Components/ArtistStoryHeader/ArtistStoryHeader"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { getENV } from "Utils/getENV"
import type { ArtistStoryHeader_Test_Query } from "__generated__/ArtistStoryHeader_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("Utils/getENV", () => ({
  getENV: jest.fn(),
}))
jest.mock("react-tracking")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "artist-id",
    contextPageOwnerSlug: "jane-example",
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
const mockGetENV = getENV as jest.Mock

const { renderWithRelay } = setupTestWrapperTL<ArtistStoryHeader_Test_Query>({
  Component: ArtistStoryHeader,
  query: graphql`
    query ArtistStoryHeader_Test_Query @relay_test_operation {
      artist(id: "jane-example") {
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
  altText: "Jane Example among her ceramics",
  credit: "Photo: Studio",
  image: { resized: { src: "https://example.com/header.jpg", srcSet: "" } },
}

const COVER_ARTWORK = {
  imageTitle: "Cover artwork title",
  image: { src: "https://example.com/cover.jpg", width: 800, height: 1000 },
}

const VANGUARD_ARTICLE = {
  slug: "vanguard-article-slug",
  href: "/article/vanguard-article-slug",
}

const BIO = "<p>Opening paragraph.</p><p>Second paragraph.</p>"

const render = ({
  story = {},
  artist = {},
  isMobile = false,
}: {
  story?: Record<string, unknown> | null
  artist?: Record<string, unknown>
  isMobile?: boolean
} = {}) => {
  mockGetENV.mockImplementation((key: string) => {
    return key === "IS_MOBILE" ? isMobile : undefined
  })

  return renderWithRelay({
    Artist: () => ({
      internalID: "artist-id",
      slug: "jane-example",
      name: "Jane Example",
      formattedNationalityAndBirthday: "American, b. 1990",
      vanguardYear: "2026",
      vanguardArticle: null,
      instagramHandle: null,
      counts: { follows: 1200 },
      biographyBlurb: { text: BIO, credit: null },
      featuredStory:
        story === null
          ? null
          : {
              headerVideo: null,
              headerImage: null,
              pullQuote: {
                text: "Beautiful and grotesque",
                attribution: null,
              },
              ...story,
            },
      movementGenes: [],
      mediumGenes: [],
      verifiedRepresentatives: [],
      articlesConnection: { totalCount: 0, edges: [] },
      coverArtwork: null,
      ...artist,
    }),
  })
}

beforeEach(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  trackEvent.mockClear()
})

describe("ArtistStoryHeader", () => {
  it.each([
    [false, "artist-story-split-header"],
    [true, "artist-story-mobile-header"],
  ])(
    "shows the header with the cover artwork and Biography without a Story when isMobile is %s",
    (isMobile, layoutTestId) => {
      render({
        isMobile,
        story: null,
        artist: { coverArtwork: COVER_ARTWORK },
      })

      expect(screen.getByTestId(layoutTestId)).toBeInTheDocument()
      expect(screen.getByText("Jane Example")).toBeInTheDocument()
      expect(screen.getByAltText("Cover artwork title")).toBeInTheDocument()
      expect(screen.queryByTestId("looping-video")).not.toBeInTheDocument()
      expect(screen.getByText(/Opening paragraph/)).toBeInTheDocument()
    },
  )

  it.each([
    ["video", { headerVideo: VIDEO }, false, "artist-story-video-header"],
    ["split", {}, false, "artist-story-split-header"],
    ["mobile", { headerVideo: VIDEO }, true, "artist-story-mobile-header"],
  ] as const)(
    "renders only the %s layout",
    (_, story, isMobile, layoutTestId) => {
      render({ story, isMobile })

      expect(screen.getByTestId(layoutTestId)).toBeInTheDocument()
      expect(screen.getAllByTestId(/^artist-story-.+-header$/)).toHaveLength(1)
    },
  )

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

    it("prefers the Header Image over the cover artwork", () => {
      render({
        story: { headerImage: IMAGE },
        artist: { coverArtwork: COVER_ARTWORK },
      })

      expect(screen.getByAltText(IMAGE.altText)).toBeInTheDocument()
      expect(
        screen.queryByAltText("Cover artwork title"),
      ).not.toBeInTheDocument()
    })

    it("skips a cover artwork without usable image data", () => {
      render({
        artist: {
          coverArtwork: {
            ...COVER_ARTWORK,
            image: { src: null, width: null, height: null },
          },
        },
      })

      expect(screen.queryByRole("img")).not.toBeInTheDocument()
    })

    it("keeps the header, with no image, when there is neither image nor cover artwork", () => {
      render()

      expect(
        screen.getByTestId("artist-story-split-header"),
      ).toBeInTheDocument()
      expect(screen.getByText("Jane Example")).toBeInTheDocument()
      expect(screen.queryByTestId("looping-video")).not.toBeInTheDocument()
      expect(screen.queryByRole("img")).not.toBeInTheDocument()
    })

    it("shows the Header Image in place of a broken video", () => {
      render({ story: { headerVideo: VIDEO, headerImage: IMAGE } })

      fireEvent.click(screen.getByRole("button", { name: "mock error" }))

      expect(screen.queryByTestId("looping-video")).not.toBeInTheDocument()
      expect(
        screen.getByAltText("Jane Example among her ceramics"),
      ).toBeInTheDocument()
      expect(screen.getByText("Photo: Studio")).toBeInTheDocument()
    })

    it("shows the cover artwork in place of a broken video without a Header Image", () => {
      render({
        story: { headerVideo: VIDEO },
        artist: { coverArtwork: COVER_ARTWORK },
      })

      fireEvent.click(screen.getByRole("button", { name: "mock error" }))

      expect(screen.queryByTestId("looping-video")).not.toBeInTheDocument()
      expect(screen.getByAltText("Cover artwork title")).toBeInTheDocument()
    })

    it("keeps the video when it breaks and there is no image to show", () => {
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
        context_owner_slug: "jane-example",
      })

      fireEvent.click(screen.getByRole("button", { name: "mock play" }))

      expect(trackEvent).toHaveBeenLastCalledWith({
        action: "clickedPlayVideo",
        context_module: "artistHeaderVideo",
        context_owner_type: "artist",
        context_owner_id: "artist-id",
        context_owner_slug: "jane-example",
      })
    })
  })

  describe("Vanguard badge", () => {
    it("links to the Vanguard article when the artist has one", () => {
      render({
        story: { headerVideo: VIDEO },
        artist: { vanguardArticle: VANGUARD_ARTICLE },
      })

      expect(
        screen.getByRole("link", { name: "2026 Vanguard Artist" }),
      ).toHaveAttribute("href", "/article/vanguard-article-slug")
    })

    it("tracks a click on the badge with the article as destination", () => {
      render({
        story: { headerVideo: VIDEO },
        artist: { vanguardArticle: VANGUARD_ARTICLE },
      })

      fireEvent.click(
        screen.getByRole("link", { name: "2026 Vanguard Artist" }),
      )

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedVanguardBadge",
        context_module: "artistVanguardBadge",
        context_page_owner_type: "artist",
        context_page_owner_id: "artist-id",
        context_page_owner_slug: "jane-example",
        destination_page_owner_type: "article",
        destination_page_owner_slug: "vanguard-article-slug",
      })
    })

    it("shows the badge without a link or click event when there is no article", () => {
      render({ story: { headerVideo: VIDEO } })

      const badge = screen.getByText("2026 Vanguard Artist")

      expect(screen.queryByRole("link", { name: /Vanguard/ })).toBeNull()

      fireEvent.click(badge)

      expect(trackEvent).not.toHaveBeenCalled()
    })

    it.each([false, true])(
      "shows the badge when there is no Header Video and isMobile is %s",
      isMobile => {
        render({ isMobile })

        expect(screen.getByText("2026 Vanguard Artist")).toBeInTheDocument()
      },
    )

    it("drops out without a Vanguard year", () => {
      render({ story: { headerVideo: VIDEO }, artist: { vanguardYear: null } })

      expect(screen.queryByText(/Vanguard Artist/)).not.toBeInTheDocument()
      expect(screen.getByText("Jane Example")).toBeInTheDocument()
    })
  })

  describe("mobile", () => {
    it("never mounts the video player, and uses the cover artwork without a Header Image", () => {
      render({
        story: { headerVideo: VIDEO },
        artist: { coverArtwork: COVER_ARTWORK },
        isMobile: true,
      })

      expect(screen.queryByTestId("looping-video")).not.toBeInTheDocument()
      expect(screen.getByAltText("Cover artwork title")).toBeInTheDocument()
    })
  })

  describe("View CV", () => {
    it.each([
      ["video layout", { headerVideo: VIDEO }, false],
      ["split layout", {}, false],
      ["mobile", { headerVideo: VIDEO }, true],
    ] as const)("has one link to the CV in the %s", (_, story, isMobile) => {
      render({ story, isMobile })

      const links = screen.getAllByRole("link", { name: "View CV" })

      expect(links).toHaveLength(1)
      expect(links[0]).toHaveAttribute("href", "/artist/jane-example/cv")
    })

    it("tracks a click on the link", () => {
      render({ story: { headerVideo: VIDEO } })

      fireEvent.click(screen.getByRole("link", { name: "View CV" }))

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedCV",
        context_module: "artistHeader",
        context_page_owner_type: "artist",
        context_page_owner_id: "artist-id",
        context_page_owner_slug: "jane-example",
      })
    })
  })

  describe("split layout", () => {
    it("shows the Pull Quote, Biography, Styles and Techniques and representation", () => {
      render({
        artist: {
          movementGenes: [
            {
              internalID: "gene-1",
              name: "Abstract Art",
              slug: "abstract-art",
            },
          ],
          verifiedRepresentatives: [
            {
              partner: {
                internalID: "partner-id",
                name: "Example Gallery",
                href: "/partner/example-gallery",
                profile: null,
              },
            },
          ],
        },
      })

      expect(screen.getByText("“Beautiful and grotesque”")).toBeInTheDocument()
      expect(screen.getByText("Opening paragraph.")).toBeInTheDocument()
      expect(screen.getByText("Abstract Art")).toBeInTheDocument()
      expect(screen.getByText("Featured representation")).toBeInTheDocument()
    })
  })

  describe("Pull Quote", () => {
    it("shows the quote with its attribution", () => {
      render({
        story: {
          headerVideo: VIDEO,
          pullQuote: { text: "Beautiful and grotesque", attribution: "Jane" },
        },
      })

      expect(screen.getByText("“Beautiful and grotesque”")).toBeInTheDocument()
      expect(screen.getByText("Jane")).toBeInTheDocument()
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
        name: "Example Gallery",
        href: "/partner/example-gallery",
        profile: null,
      },
    }

    it("links to each verified representative and tracks the click", () => {
      render({
        story: { headerVideo: VIDEO },
        artist: { verifiedRepresentatives: [GALLERY] },
      })

      expect(screen.getByText("Featured representation")).toBeInTheDocument()

      const link = screen.getByRole("link", { name: "Example Gallery" })
      expect(link).toHaveAttribute("href", "/partner/example-gallery")

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
    it.each([
      ["video layout", { headerVideo: VIDEO }, false],
      ["split layout", {}, false],
      ["mobile", { headerVideo: VIDEO }, true],
    ] as const)(
      "links to the artist's Instagram in the %s",
      (_, story, isMobile) => {
        render({ story, isMobile, artist: { instagramHandle: "janeexample" } })

        expect(
          screen.getByRole("link", { name: "Visit janeexample on Instagram" }),
        ).toBeInTheDocument()
      },
    )

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
        screen.getByText("Artsy Editorial Featuring Jane Example"),
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

    it.each([false, true])(
      "shows Styles and Techniques without a Biography or representation when isMobile is %s",
      isMobile => {
        render({
          isMobile,
          story: { headerVideo: VIDEO },
          artist: {
            biographyBlurb: null,
            movementGenes: [
              {
                internalID: "gene-id",
                name: "Example Style",
                slug: "example-style",
              },
            ],
          },
        })

        expect(screen.getByText("Example Style")).toBeInTheDocument()
      },
    )

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
