import { OwnerType } from "@artsy/cohesion"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { SuggestedArtworksModalGrid } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksModalGrid"
import { SavedSearchAlertContextProvider } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import type { SavedSearchEntity } from "Components/SavedSearchAlert/types"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { SuggestedArtworksModalGrid_Test_Query } from "__generated__/SuggestedArtworksModalGrid_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "artwork-id",
    contextPageOwnerSlug: "artwork-slug",
    contextPageOwnerType: "artwork",
  })),
}))

describe("SuggestedArtworksModalGrid", () => {
  const mockUseTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  beforeAll(() => {
    mockUseTracking.mockImplementation(() => ({ trackEvent }))
  })

  const savedSearchEntity: SavedSearchEntity = {
    defaultCriteria: {
      artistIDs: [
        {
          displayValue: "Banksy",
          value: "4dd1584de0091e000100207c",
        },
      ],
    },
    owner: {
      type: OwnerType.artwork,
      id: "owner-id",
      slug: "owner-slug",
      name: "Owner Name",
    },
  }

  const criteria = {
    additionalGeneIDs: ["prints"],
    artistIDs: ["4dd1584de0091e000100207c"],
    attributionClass: ["unique"],
  }

  const { renderWithRelay } =
    setupTestWrapperTL<SuggestedArtworksModalGrid_Test_Query>({
      Component: props => {
        return (
          <SavedSearchAlertContextProvider
            entity={savedSearchEntity}
            criteria={criteria}
            aggregations={[]}
            artistSlug="bansky"
          >
            <SuggestedArtworksModalGrid
              onClose={() => {}}
              artworksConnection={props.artworksConnection}
            />
          </SavedSearchAlertContextProvider>
        )
      },
      query: graphql`
        query SuggestedArtworksModalGrid_Test_Query @relay_test_operation {
          artworksConnection(first: 10, sort: "-published_at", forSale: true) {
            counts {
              total
            }
            ...ArtworkGrid_artworks
          }
        }
      `,
    })

  it("renders artwork grid and explore more button", async () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        counts: { total: 11 },
        edges: [
          {
            node: {
              title: "Test Artwork Title",
            },
          },
        ],
      }),
    })

    await waitFor(() => {
      expect(screen.getByText("11 Artworks:")).toBeInTheDocument()
    })

    expect(screen.getByText("Test Artwork Title")).toBeInTheDocument()
    expect(screen.getByText("Explore more on Artsy")).toBeInTheDocument()
  })

  it("doesn't render explore more button if there are less than 10 artworks", async () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        counts: { total: 9 },
      }),
    })

    await waitFor(() => {
      expect(screen.getByText("9 Artworks:")).toBeInTheDocument()
    })

    const exploreMoreButton = screen.queryByText("Explore more on Artsy")
    expect(exploreMoreButton).not.toBeInTheDocument()
  })

  it("tracks click on 'Explore more on Artsy' button", async () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        counts: { total: 11 },
        edges: [
          {
            node: {
              title: "Test Artwork Title",
            },
          },
        ],
      }),
    })

    await waitFor(() => {
      expect(screen.getByText("Explore more on Artsy")).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText("Explore more on Artsy"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArtworkGroup",
      context_module: "artworkClosedLotHeader",
      context_page_owner_id: "artwork-id",
      context_page_owner_slug: "artwork-slug",
      context_page_owner_type: "artwork",
      type: "viewAll",
    })
  })
})
