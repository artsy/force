import { fireEvent, screen } from "@testing-library/react"
import { HomeArtworkRecommendationsRail } from "Apps/Home/Components/HomeArtworkRecommendationsRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const trackEvent = jest.fn()

beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  trackEvent.mockClear()
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <HomeArtworkRecommendationsRail me={props.me!} />
  },
  query: graphql`
    query HomeArtworkRecommendationsRail_Test_Query @relay_test_operation {
      me {
        ...HomeArtworkRecommendationsRail_me
      }
    }
  `,
})

describe("HomeArtworkRecommendationsRail", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Me: () => ({
        artworkRecommendations: {
          edges: [
            {
              node: {
                internalID: "artwork-1",
                slug: "test-artwork",
                href: "/artwork/test-artwork",
                collectorSignals: null,
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("We Think You’ll Love")).toBeInTheDocument()
    expect(screen.getByText("View All Works")).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: "View All Works" }),
    ).toHaveAttribute("href", "/recommendations/artworks")
  })

  it("does not render when no artworks", () => {
    const { container } = renderWithRelay({
      Me: () => ({
        artworkRecommendations: {
          edges: [],
        },
      }),
    })

    expect(container).toBeEmptyDOMElement()
  })

  it("tracks artwork click", () => {
    renderWithRelay({
      Me: () => ({
        artworkRecommendations: {
          edges: [
            {
              node: {
                internalID: "artwork-1",
                slug: "test-artwork",
                href: "/artwork/test-artwork",
                collectorSignals: null,
              },
            },
          ],
        },
      }),
    })

    fireEvent.click(screen.getByTestId("ShelfArtwork"))

    expect(trackEvent).toBeCalledWith({
      action: "clickedArtworkGroup",
      context_module: "artworkRecommendationsRail",
      context_page_owner_type: "home",
      destination_page_owner_id: "artwork-1",
      destination_page_owner_slug: "test-artwork",
      destination_page_owner_type: "artwork",
      type: "thumbnail",
      signal_label: "",
      signal_bid_count: undefined,
      signal_lot_watcher_count: undefined,
    })
  })

  it("tracks view all click", () => {
    renderWithRelay({
      Me: () => ({
        artworkRecommendations: {
          edges: [
            {
              node: {
                internalID: "artwork-1",
                slug: "test-artwork",
                href: "/artwork/test-artwork",
                collectorSignals: null,
              },
            },
          ],
        },
      }),
    })

    fireEvent.click(screen.getByRole("link", { name: "View All Works" }))

    expect(trackEvent).toBeCalledWith({
      action: "clickedArtworkGroup",
      context_module: "artworkRecommendationsRail",
      context_page_owner_type: "home",
      destination_page_owner_type: "artworkRecommendations",
      destination_page_owner_id: "artwork-recommendations",
      destination_page_owner_slug: "artwork-recommendations",
      type: "viewAll",
    })
  })

  it("renders multiple artworks", () => {
    renderWithRelay({
      Me: () => ({
        artworkRecommendations: {
          edges: [
            {
              node: {
                internalID: "artwork-1",
                slug: "test-artwork-1",
                href: "/artwork/test-artwork-1",
                collectorSignals: null,
              },
            },
            {
              node: {
                internalID: "artwork-2",
                slug: "test-artwork-2",
                href: "/artwork/test-artwork-2",
                collectorSignals: null,
              },
            },
          ],
        },
      }),
    })

    expect(screen.getAllByTestId("ShelfArtwork")).toHaveLength(2)
  })
})
