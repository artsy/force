import { fireEvent, screen, waitFor } from "@testing-library/react"
import { ArtistStoryAbout } from "Apps/Artist/Routes/Overview/Components/ArtistStoryAbout/ArtistStoryAbout"
import { useCookieConsentManager } from "Components/CookieConsentManager/CookieConsentManagerContext"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistStoryAbout_Test_Query } from "__generated__/ArtistStoryAbout_Test_Query.graphql"
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
jest.mock(
  "Components/CookieConsentManager/CookieConsentManagerContext",
  () => ({
    useCookieConsentManager: jest.fn(),
  }),
)
jest.mock("Components/LoopingVimeoVideo/utils/vimeo", () => ({
  getVimeoThumbnailUrl: jest.fn(() =>
    Promise.resolve("https://example.com/vimeo-thumb.jpg"),
  ),
}))
jest.mock("Components/LoopingVimeoVideo/LoopingVimeoVideo", () => ({
  LoopingVimeoVideo: ({ playerUrl, onPlay, onPause }) => (
    <div data-testid="looping-video" data-player-url={playerUrl}>
      <button type="button" onClick={onPlay}>
        mock play
      </button>
      <button type="button" onClick={onPause}>
        mock pause
      </button>
    </div>
  ),
}))

const trackEvent = jest.fn()
const openConsentManager = jest.fn()

const { renderWithRelay } = setupTestWrapperTL<ArtistStoryAbout_Test_Query>({
  Component: ArtistStoryAbout,
  query: graphql`
    query ArtistStoryAbout_Test_Query @relay_test_operation {
      artist(id: "heidi-lau") {
        ...ArtistStoryAbout_artist
      }
    }
  `,
})

const PORTRAIT = {
  altText: "Heidi Lau in her studio",
  credit: "Photo: Studio",
  image: { resized: { src: "https://example.com/portrait.jpg", srcSet: "" } },
}

const VIMEO_PROCESS_VIDEO = {
  video: {
    playerUrl: "https://player.vimeo.com/video/2",
    title: "Heidi Lau on her process",
  },
}

const YOUTUBE_PROCESS_VIDEO = {
  video: {
    playerUrl: "https://www.youtube.com/embed/l60XniFlj7w",
    title: "Heidi Lau on her process",
  },
}

const MOTION_VIDEO = {
  internalID: "motion-1",
  caption: "In motion",
  quote: { text: "Our body’s worth", attribution: "Heidi Lau" },
  video: {
    playerUrl: "https://player.vimeo.com/video/3",
    aspectRatio: 1.33,
    title: "Sculpture moving",
  },
}

const FULL_STORY = {
  accentColor: { hex: "#9db8a8", textColor: "BLACK" },
  about: {
    tagline: "Hand-built clay formations",
    body: "<p>Lau grew up in Macau.</p>",
    portrait: PORTRAIT,
  },
  processVideo: VIMEO_PROCESS_VIDEO,
  motionVideos: [MOTION_VIDEO],
}

const render = (story: Record<string, unknown> | null = FULL_STORY) => {
  return renderWithRelay({ Artist: () => ({ featuredStory: story }) })
}

beforeEach(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  ;(useCookieConsentManager as jest.Mock).mockImplementation(() => ({
    isDestinationAllowed: () => true,
    openConsentManager,
    ready: true,
  }))
  trackEvent.mockClear()
  openConsentManager.mockClear()
})

describe("ArtistStoryAbout", () => {
  it("renders nothing without a Story", () => {
    render(null)

    expect(screen.queryByTestId("artist-story-about")).not.toBeInTheDocument()
  })

  it("renders nothing when the Story has no About content", () => {
    render({
      accentColor: FULL_STORY.accentColor,
      about: { tagline: " ", body: null, portrait: null },
      processVideo: null,
      motionVideos: [],
    })

    expect(screen.queryByTestId("artist-story-about")).not.toBeInTheDocument()
  })

  it("shows every part", async () => {
    render()

    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Process" })).toBeInTheDocument()
    expect(screen.getByAltText("Heidi Lau in her studio")).toHaveAttribute(
      "src",
      "https://example.com/portrait.jpg",
    )
    expect(screen.getByText("Photo: Studio")).toBeInTheDocument()
    expect(screen.getByText("Hand-built clay formations")).toBeInTheDocument()
    expect(screen.getByText("Lau grew up in Macau.")).toBeInTheDocument()

    const processVideo = screen.getByTestId("artist-story-process-video")

    expect(screen.getByTestId("looping-video")).toHaveAttribute(
      "data-player-url",
      "https://player.vimeo.com/video/3",
    )
    expect(screen.getByText("In motion")).toBeInTheDocument()
    expect(screen.getByText("“Our body’s worth”")).toBeInTheDocument()
    expect(screen.getByText("Heidi Lau")).toBeInTheDocument()

    await waitFor(() => {
      expect(
        processVideo.querySelector(
          "img[src='https://example.com/vimeo-thumb.jpg']",
        ),
      ).toBeInTheDocument()
    })
  })

  describe("missing parts", () => {
    it("drops the portrait", () => {
      render({ ...FULL_STORY, about: { ...FULL_STORY.about, portrait: null } })

      expect(
        screen.queryByTestId("artist-story-portrait"),
      ).not.toBeInTheDocument()
      expect(screen.getByText("Hand-built clay formations")).toBeInTheDocument()
    })

    it("drops the Process Video", () => {
      render({ ...FULL_STORY, processVideo: null })

      expect(
        screen.queryByTestId("artist-story-process-video"),
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole("heading", { name: "Process" }),
      ).not.toBeInTheDocument()
      expect(
        screen.getByTestId("artist-story-motion-videos"),
      ).toBeInTheDocument()
    })

    it("drops the Motion Videos", () => {
      render({ ...FULL_STORY, motionVideos: [] })

      expect(
        screen.queryByTestId("artist-story-motion-videos"),
      ).not.toBeInTheDocument()
      expect(
        screen.getByTestId("artist-story-process-video"),
      ).toBeInTheDocument()
    })

    it("drops a blank Motion Video caption and Quote", () => {
      render({
        ...FULL_STORY,
        motionVideos: [
          {
            ...MOTION_VIDEO,
            caption: " ",
            quote: { text: " ", attribution: null },
          },
        ],
      })

      const band = screen.getByTestId("artist-story-motion-videos")

      expect(screen.getByTestId("looping-video")).toBeInTheDocument()
      expect(band.querySelector("figcaption")).not.toBeInTheDocument()
      expect(band.querySelector("blockquote")).not.toBeInTheDocument()
    })

    const NO_ABOUT = { tagline: null, body: null, portrait: null }

    it.each([
      ["a portrait", { about: { ...NO_ABOUT, portrait: PORTRAIT } }],
      ["a tagline", { about: { ...NO_ABOUT, tagline: "Clay formations" } }],
      ["a body", { about: { ...NO_ABOUT, body: "<p>Lau grew up.</p>" } }],
      ["a Process Video", { processVideo: VIMEO_PROCESS_VIDEO }],
      ["a Motion Video", { motionVideos: [MOTION_VIDEO] }],
    ])("shows the section with only %s", (_, part) => {
      render({
        accentColor: null,
        about: NO_ABOUT,
        processVideo: null,
        motionVideos: [],
        ...part,
      })

      expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument()
    })
  })

  describe("Accent Color", () => {
    it("colors the portrait block and the band, with white text on a dark accent", () => {
      render({
        ...FULL_STORY,
        accentColor: { hex: "#1e3a5f", textColor: "WHITE" },
      })

      expect(screen.getByTestId("artist-story-portrait")).toHaveStyle({
        backgroundColor: "#1e3a5f",
      })
      expect(screen.getByTestId("artist-story-motion-videos")).toHaveStyle({
        backgroundColor: "#1e3a5f",
      })
      expect(screen.getByText("“Our body’s worth”")).toHaveStyle({
        color: "#FFFFFF",
      })
    })

    it("falls back to grey with black text without an Accent Color", () => {
      render({ ...FULL_STORY, accentColor: null })

      expect(screen.getByTestId("artist-story-portrait")).toHaveStyle({
        backgroundColor: "#E7E7E7",
      })
      expect(screen.getByTestId("artist-story-motion-videos")).toHaveStyle({
        backgroundColor: "#E7E7E7",
      })
      expect(screen.getByText("“Our body’s worth”")).toHaveStyle({
        color: "#000000",
      })
    })
  })

  describe("Process Video", () => {
    it("plays inline with sound when the visitor presses play", () => {
      render()

      expect(
        screen.queryByTitle("Heidi Lau on her process"),
      ).not.toBeInTheDocument()

      fireEvent.click(
        screen.getByRole("button", { name: "Play Process Video" }),
      )

      expect(screen.getByTitle("Heidi Lau on her process")).toHaveAttribute(
        "src",
        "https://player.vimeo.com/video/2?autoplay=1&autopause=0",
      )
      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedPlayVideo",
        context_module: "artistProcessVideo",
        context_owner_type: "artist",
        context_owner_id: "artist-id",
        context_owner_slug: "heidi-lau",
      })
    })

    it("plays a YouTube video, with its thumbnail as the poster", async () => {
      render({ ...FULL_STORY, processVideo: YOUTUBE_PROCESS_VIDEO })

      await waitFor(() => {
        expect(
          screen
            .getByTestId("artist-story-process-video")
            .querySelector(
              "img[src='https://i.ytimg.com/vi/l60XniFlj7w/hqdefault.jpg']",
            ),
        ).toBeInTheDocument()
      })

      fireEvent.click(
        screen.getByRole("button", { name: "Play Process Video" }),
      )

      expect(screen.getByTitle("Heidi Lau on her process")).toHaveAttribute(
        "src",
        "https://www.youtube.com/embed/l60XniFlj7w?autoplay=1",
      )
    })

    it("asks for cookie consent before loading YouTube", () => {
      ;(useCookieConsentManager as jest.Mock).mockImplementation(() => ({
        isDestinationAllowed: () => false,
        openConsentManager,
        ready: true,
      }))

      render({ ...FULL_STORY, processVideo: YOUTUBE_PROCESS_VIDEO })

      expect(
        screen.queryByRole("button", { name: "Play Process Video" }),
      ).not.toBeInTheDocument()

      fireEvent.click(screen.getByText("Manage Cookies"))

      expect(openConsentManager).toHaveBeenCalled()
    })

    it("shows nothing for YouTube until the consent manager is ready", () => {
      ;(useCookieConsentManager as jest.Mock).mockImplementation(() => ({
        isDestinationAllowed: () => false,
        openConsentManager,
        ready: false,
      }))

      render({ ...FULL_STORY, processVideo: YOUTUBE_PROCESS_VIDEO })

      expect(screen.queryByText("Manage Cookies")).not.toBeInTheDocument()
      expect(
        screen.queryByRole("button", { name: "Play Process Video" }),
      ).not.toBeInTheDocument()
    })

    it("plays a Vimeo video without YouTube consent", () => {
      ;(useCookieConsentManager as jest.Mock).mockImplementation(() => ({
        isDestinationAllowed: () => false,
        openConsentManager,
        ready: true,
      }))

      render()

      expect(screen.queryByText("Manage Cookies")).not.toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: "Play Process Video" }),
      ).toBeInTheDocument()
    })
  })

  it("tracks play and pause of a Motion Video", () => {
    render()

    fireEvent.click(screen.getByRole("button", { name: "mock pause" }))

    expect(trackEvent).toHaveBeenLastCalledWith({
      action: "clickedPauseVideo",
      context_module: "artistMotionVideo",
      context_owner_type: "artist",
      context_owner_id: "artist-id",
      context_owner_slug: "heidi-lau",
    })

    fireEvent.click(screen.getByRole("button", { name: "mock play" }))

    expect(trackEvent).toHaveBeenLastCalledWith({
      action: "clickedPlayVideo",
      context_module: "artistMotionVideo",
      context_owner_type: "artist",
      context_owner_id: "artist-id",
      context_owner_slug: "heidi-lau",
    })
  })
})
