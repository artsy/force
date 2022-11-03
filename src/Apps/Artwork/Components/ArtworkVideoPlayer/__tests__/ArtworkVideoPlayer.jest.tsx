import { act, fireEvent, waitFor } from "@testing-library/react"
import { ArtworkVideoPlayer_Test_Query } from "__generated__/ArtworkVideoPlayer_Test_Query.graphql"
import { ArtworkVideoPlayerFragmentContainer } from "Apps/Artwork/Components/ArtworkVideoPlayer/ArtworkVideoPlayer"
import { useTracking } from "react-tracking"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("ArtworkVideoPlayer", () => {
  jest.useFakeTimers()

  const mockUseTracking = useTracking as jest.Mock
  const image = { type: "Image" }
  const video = { type: "Video" }

  const { renderWithRelay } = setupTestWrapperTL<ArtworkVideoPlayer_Test_Query>(
    {
      Component: props => (
        <ArtworkVideoPlayerFragmentContainer
          activeIndex={0}
          artwork={props.artwork!}
          maxHeight={500}
        />
      ),
      query: graphql`
        query ArtworkVideoPlayer_Test_Query {
          artwork(id: "foo") {
            ...ArtworkVideoPlayer_artwork
          }
        }
      `,
    }
  )

  beforeEach(() => {
    mockUseTracking.mockReturnValue({ trackEvent: jest.fn() })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("renders with video figure", () => {
    const { container } = renderWithRelay({
      Artwork: () => ({
        figures: [image, video],
      }),
    })

    expect(container).toBeInTheDocument()
    expect(container.childNodes.length).toBe(1)
  })

  it("does not render without a video figure", () => {
    const { container } = renderWithRelay({
      Artwork: () => ({
        figures: [],
      }),
    })
    expect(container).toBeInTheDocument()
    expect(container.childNodes.length).toBe(0)
  })

  describe("tracking", () => {
    it("tracks on mount", async () => {
      const spy = jest.fn()

      mockUseTracking.mockReturnValue({
        trackEvent: spy,
      })

      renderWithRelay({
        Artwork: () => ({
          internalID: "foo",
          slug: "bar",
          figures: [video],
        }),
      })

      jest.advanceTimersByTime(10)

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith({
          action: "viewedVideo",
          context_screen_owner_id: "foo",
          context_screen_owner_slug: "bar",
          context_screen_owner_type: "artwork",
        })
      })
    })

    it("tracks on video click", async () => {
      const element = document.createElement("div")
      jest.spyOn(document, "querySelector").mockReturnValue(element)
      jest.spyOn(document, "activeElement", "get").mockReturnValue(element)

      const spy = jest.fn()

      mockUseTracking.mockReturnValue({
        trackEvent: spy,
      })

      renderWithRelay({
        Artwork: () => ({
          internalID: "foo",
          slug: "bar",
          figures: [video],
        }),
      })

      jest.advanceTimersByTime(10)

      act(() => {
        fireEvent.blur(window)
        jest.advanceTimersByTime(10)
      })

      await waitFor(() => {
        expect(spy.mock.calls[1]).toEqual([
          {
            action: "clickedPlayVideo",
            context_owner_id: "foo",
            context_owner_slug: "bar",
            context_owner_type: "artwork",
          },
        ])
      })
    })
  })
})
