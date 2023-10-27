import { OwnerType } from "@artsy/cohesion"
import { SuggestedArtworksShelf } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksShelf"
import { SavedSearchAlertContextProvider } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { SavedSearchEntity } from "Components/SavedSearchAlert/types"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { SuggestedArtworksShelf_Test_Query } from "__generated__/SuggestedArtworksShelf_Test_Query.graphql"

jest.unmock("react-relay")

describe("SuggestedArtworksShelf", () => {
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

  const { renderWithRelay } = setupTestWrapperTL<
    SuggestedArtworksShelf_Test_Query
  >({
    Component: props => {
      return (
        <SavedSearchAlertContextProvider
          entity={savedSearchEntity}
          criteria={criteria}
          aggregations={[]}
          artistSlug="bansky"
        >
          <SuggestedArtworksShelf
            artworksConnection={props.artworksConnection}
          />
        </SavedSearchAlertContextProvider>
      )
    },
    query: graphql`
      query SuggestedArtworksShelf_Test_Query @relay_test_operation {
        artworksConnection(first: 5, sort: "-published_at", forSale: true) {
          counts {
            total
          }
          edges {
            node {
              ...ShelfArtwork_artwork
              internalID
            }
          }
        }
      }
    `,
  })

  it("renders SuggestedArtworkShelf", async () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        counts: { total: 11 },
      }),
    })
    expect(screen.queryByTestId("ShelfSuggestedArtworks")).toBeInTheDocument()
  })

  it("renders nothing if there are no related artworks", () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        edges: [],
      }),
    })
    expect(
      screen.queryByTestId("ShelfSuggestedArtworks")
    ).not.toBeInTheDocument()
  })
})
