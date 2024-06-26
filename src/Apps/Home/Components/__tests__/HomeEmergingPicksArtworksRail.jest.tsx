import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { HomeEmergingPicksArtworksRailFragmentContainer } from "Apps/Home/Components/HomeEmergingPicksArtworksRail"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: HomeEmergingPicksArtworksRailFragmentContainer,
  query: graphql`
    query HomeEmergingPicksArtworksRail_Test_Query @relay_test_operation {
      viewer {
        ...HomeEmergingPicksArtworksRail_viewer
      }
    }
  `,
})

describe("HomeEmergingPicksArtworksRail", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
  })

  afterEach(() => {
    trackEvent.mockClear()
  })

  it("renders correctly", () => {
    renderWithRelay({
      Viewer: () => artworksConnection,
    })

    expect(screen.getByText(/Test Artwork/)).toBeInTheDocument()
    expect(screen.getAllByRole("link")[2]).toHaveAttribute("href", "test-href")
  })

  it("tracks artwork click", () => {
    renderWithRelay({
      Viewer: () => artworksConnection,
    })

    fireEvent.click(screen.getAllByRole("link")[2])

    expect(trackEvent).toBeCalledWith({
      action: "clickedArtworkGroup",
      context_module: "troveArtworksRail",
      context_page_owner_type: "home",
      destination_page_owner_id: "artwork-id",
      destination_page_owner_slug: "artwork-slug",
      destination_page_owner_type: "artwork",
      type: "thumbnail",
    })
  })

  it("tracks view all", () => {
    renderWithRelay({
      Viewer: () => artworksConnection,
    })

    fireEvent.click(screen.getAllByRole("link")[1])

    expect(trackEvent).toBeCalledWith({
      action: "clickedArtworkGroup",
      context_module: "troveArtworksRail",
      context_page_owner_type: "home",
      destination_page_owner_id: "932d0b13-3cf1-46d1-8e49-18b186230347",
      destination_page_owner_slug: "curators-picks-emerging",
      destination_page_owner_type: "collection",
      type: "viewAll",
    })
  })
})

const artworksConnection = {
  artworksConnection: {
    edges: [
      {
        node: {
          title: "Test Artwork",
          href: "test-href",
          internalID: "artwork-id",
          slug: "artwork-slug",
        },
      },
    ],
  },
}
