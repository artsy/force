import { fireEvent, screen, waitFor } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { ImmersiveView } from "Components/ArtworkFilter/ImmersiveView"
import type { ImmersiveViewTestQuery } from "__generated__/ImmersiveViewTestQuery.graphql"
import { graphql } from "react-relay"
import { ImmersiveView_filtered_artworks$data } from "__generated__/ImmersiveView_filtered_artworks.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")

const trackEvent = jest.fn()

jest.mock("react-tracking")

// Mock Blurhash to avoid canvas-related errors in tests
jest.mock("react-blurhash", () => ({
  Blurhash: ({ props }: any) => (
    <div data-testid="immersive-view-blurhash-mock" {...props} />
  ),
}))

const { renderWithRelay } = setupTestWrapperTL<ImmersiveViewTestQuery>({
  Component: (props: any) => (
    <ImmersiveView
      artworks={props.filtered_artworks!}
      isPageLoading={props.isPageLoading || false}
      onClose={props.onClose}
    />
  ),
  query: graphql`
    query ImmersiveViewTestQuery @relay_test_operation {
      filtered_artworks: artworksConnection {
        ...ImmersiveView_filtered_artworks
      }
    }
  `,
})

describe("ImmersiveView", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    trackEvent.mockClear()
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  it("renders correctly", async () => {
    renderWithRelay({
      FilterArtworksConnection: () => filterArtworksConnectionData,
    })

    expect(screen.getByText("Artwork 1")).toBeInTheDocument()
    expect(screen.queryByText("Artwork 2")).not.toBeInTheDocument()
    expect(screen.queryByText("Artwork 3")).not.toBeInTheDocument()
  })

  it("renders blurhash while loading, and then the actual image", async () => {
    renderWithRelay({
      FilterArtworksConnection: () => filterArtworksConnectionData,
    })

    expect(
      screen.queryByRole("img", { name: "Artwork 1" }),
    ).not.toBeInTheDocument()

    expect(
      screen.getByTestId("immersive-view-blurhash-mock"),
    ).toBeInTheDocument()

    const imageComponent = screen.getByTestId("immersive-view-image")
    fireEvent.load(imageComponent)

    await waitFor(() => {
      expect(screen.getByRole("img", { name: "Artwork 1" })).toHaveAttribute(
        "src",
        "https://example.com/artwork-1.jpg",
      )

      expect(
        screen.queryByTestId("immersive-view-blurhash-mock"),
      ).not.toBeInTheDocument()
    })
  })

  it("closes", () => {
    const mockClose = jest.fn()
    const props = {
      onClose: mockClose,
    }
    renderWithRelay({}, props)

    screen.getByRole("button", { name: "Close" }).click()

    expect(mockClose).toHaveBeenCalled()
  })

  it("navigates to prev/next artworks via keyboard", () => {
    renderWithRelay({
      FilterArtworksConnection: () => filterArtworksConnectionData,
    })

    expect(screen.getByText("Artwork 1")).toBeInTheDocument()
    expect(screen.queryByText("Artwork 2")).not.toBeInTheDocument()

    fireEvent.keyDown(document, { key: "ArrowRight" })

    expect(screen.queryByText("Artwork 1")).not.toBeInTheDocument()
    expect(screen.getByText("Artwork 2")).toBeInTheDocument()

    fireEvent.keyDown(document, { key: "ArrowLeft" })

    expect(screen.getByText("Artwork 1")).toBeInTheDocument()
    expect(screen.queryByText("Artwork 2")).not.toBeInTheDocument()
  })

  it("navigates to prev/next artworks via buttons", async () => {
    renderWithRelay({
      FilterArtworksConnection: () => filterArtworksConnectionData,
    })

    expect(screen.getByText("Artwork 1")).toBeInTheDocument()
    expect(screen.queryByText("Artwork 2")).not.toBeInTheDocument()

    screen.getByRole("button", { name: "Next artwork" }).click()

    waitFor(() => {
      expect(screen.queryByText("Artwork 1")).not.toBeInTheDocument()
      expect(screen.getByText("Artwork 2")).toBeInTheDocument()
    })

    screen.getByRole("button", { name: "Previous artwork" }).click()

    waitFor(() => {
      expect(screen.getByText("Artwork 1")).toBeInTheDocument()
      expect(screen.queryByText("Artwork 2")).not.toBeInTheDocument()
    })
  })

  it("navigates to prev/next pages via keyboard", async () => {
    renderWithRelay(
      { FilterArtworksConnection: () => filterArtworksConnectionData },
      { isPageLoading: false },
    )

    expect(screen.queryByText("Loading more artworks…")).not.toBeInTheDocument()

    renderWithRelay(
      { FilterArtworksConnection: () => filterArtworksConnectionData },
      { isPageLoading: true },
    )

    expect(screen.getByText("Loading more artworks…")).toBeInTheDocument()
  })

  describe("tracking", () => {
    it("tracks immersiveViewArtworkDisplayed on mount", () => {
      renderWithRelay({
        FilterArtworksConnection: () => filterArtworksConnectionData,
      })

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "immersiveViewArtworkDisplayed",
          context_module: "artworkGrid",
          context_screen_owner_id: "artwork-id-1",
        }),
      )
    })

    it("tracks immersiveViewArtworkDisplayed when navigating to next artwork", () => {
      renderWithRelay({
        FilterArtworksConnection: () => filterArtworksConnectionData,
      })

      trackEvent.mockClear()

      fireEvent.keyDown(document, { key: "ArrowRight" })

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "immersiveViewArtworkDisplayed",
          context_module: "artworkGrid",
          context_screen_owner_id: "artwork-id-2",
        }),
      )
    })

    it("tracks immersiveViewArtworkDisplayed when navigating to previous artwork", () => {
      renderWithRelay({
        FilterArtworksConnection: () => filterArtworksConnectionData,
      })

      // Navigate to second artwork first
      fireEvent.keyDown(document, { key: "ArrowRight" })

      trackEvent.mockClear()

      // Navigate back to first artwork
      fireEvent.keyDown(document, { key: "ArrowLeft" })

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "immersiveViewArtworkDisplayed",
          context_module: "artworkGrid",
          context_screen_owner_id: "artwork-id-1",
        }),
      )
    })

    it("tracks clickedMainArtworkGrid when clicking on artwork", () => {
      renderWithRelay({
        FilterArtworksConnection: () => filterArtworksConnectionData,
      })

      const artworkLink = screen.getByRole("link")
      fireEvent.click(artworkLink)

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "clickedMainArtworkGrid",
          context_module: "artworkGrid",
          destination_page_owner_id: "artwork-id-1",
          destination_page_owner_type: "artwork",
          destination_page_owner_slug: "artwork-1",
          label: "immersiveView",
          type: "thumbnail",
        }),
      )
    })
  })
})

const filterArtworksConnectionData: Pick<
  ImmersiveView_filtered_artworks$data,
  "edges" | "pageInfo"
> = {
  pageInfo: { hasNextPage: true },
  edges: [
    {
      immersiveArtworkNode: {
        internalID: "artwork-id-1",
        slug: "artwork-1",
        formattedMetadata: "Artwork 1",
        image: {
          aspectRatio: 1,
          blurhash: "H4$#",
          url: "https://example.com/artwork-1.jpg",
        },
      },
    },
    {
      immersiveArtworkNode: {
        internalID: "artwork-id-2",
        slug: "artwork-2",
        formattedMetadata: "Artwork 2",
        image: {
          aspectRatio: 1,
          blurhash: "H4$#",
          url: "https://example.com/artwork-2.jpg",
        },
      },
    },
    {
      immersiveArtworkNode: {
        internalID: "artwork-id-3",
        slug: "artwork-3",
        formattedMetadata: "Artwork 3",
        image: {
          aspectRatio: 1,
          blurhash: "H4$#",
          url: "https://example.com/artwork-3.jpg",
        },
      },
    },
  ],
}
