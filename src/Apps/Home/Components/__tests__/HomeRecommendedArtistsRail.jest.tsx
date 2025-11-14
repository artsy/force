import { HomeRecommendedArtistsRail } from "Apps/Home/Components/HomeRecommendedArtistsRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/react"
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
    return <HomeRecommendedArtistsRail me={props.me!} />
  },
  query: graphql`
    query HomeRecommendedArtistsRail_Test_Query @relay_test_operation {
      me {
        ...HomeRecommendedArtistsRail_me
      }
    }
  `,
})

describe("HomeRecommendedArtistsRail", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Me: () => ({
        artistRecommendations: {
          edges: [
            {
              node: {
                internalID: "artist-1",
                slug: "test-artist",
                href: "/artist/test-artist",
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("Recommended Artists")).toBeInTheDocument()
    expect(screen.getByText("View Artists")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "View Artists" })).toHaveAttribute(
      "href",
      "/recommendations/artists",
    )
  })

  it("does not render when no artists", () => {
    const { container } = renderWithRelay({
      Me: () => ({
        artistRecommendations: {
          edges: [],
        },
      }),
    })

    expect(container).toBeEmptyDOMElement()
  })

  it("tracks artist click", () => {
    renderWithRelay({
      Me: () => ({
        artistRecommendations: {
          edges: [
            {
              node: {
                internalID: "artist-1",
                slug: "test-artist",
                href: "/artist/test-artist",
              },
            },
          ],
        },
      }),
    })

    fireEvent.click(screen.getByTestId("CellArtist"))

    expect(trackEvent).toBeCalledWith({
      action: "clickedArtistGroup",
      context_module: "recommendedArtistsRail",
      context_page_owner_type: "home",
      destination_page_owner_id: "artist-1",
      destination_page_owner_slug: "test-artist",
      destination_page_owner_type: "artist",
      type: "thumbnail",
    })
  })

  it("tracks view all click", () => {
    renderWithRelay({
      Me: () => ({
        artistRecommendations: {
          edges: [
            {
              node: {
                internalID: "artist-1",
                slug: "test-artist",
                href: "/artist/test-artist",
              },
            },
          ],
        },
      }),
    })

    fireEvent.click(screen.getByRole("link", { name: "View Artists" }))

    expect(trackEvent).toBeCalledWith({
      action: "clickedArtistGroup",
      context_module: "recommendedArtistsRail",
      context_page_owner_type: "home",
      destination_page_owner_type: "recommendedArtists",
      type: "viewAll",
    })
  })

  it("renders multiple artists", () => {
    renderWithRelay({
      Me: () => ({
        artistRecommendations: {
          edges: [
            {
              node: {
                internalID: "artist-1",
                slug: "test-artist-1",
                href: "/artist/test-artist-1",
              },
            },
            {
              node: {
                internalID: "artist-2",
                slug: "test-artist-2",
                href: "/artist/test-artist-2",
              },
            },
          ],
        },
      }),
    })

    expect(screen.getAllByTestId("CellArtist")).toHaveLength(2)
  })
})
