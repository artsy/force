import { OwnerType } from "@artsy/cohesion"
import { screen } from "@testing-library/react"
import { SuggestedArtworksModal } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/SuggestedArtworksModal"
import { SavedSearchAlertContextProvider } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { SavedSearchEntity } from "Components/SavedSearchAlert/types"
import { render } from "DevTools/renderWithMockBoot"

describe("SuggestedArtworksModal", () => {
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

  const renderComponent = () => {
    render(
      <SavedSearchAlertContextProvider
        entity={savedSearchEntity}
        criteria={criteria}
        aggregations={[]}
      >
        <SuggestedArtworksModal onClose={() => {}} />
      </SavedSearchAlertContextProvider>
    )
  }

  it("renders title and pills", () => {
    renderComponent()

    expect(screen.getByText("Works by Banksy")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Available works you may have missed based on similar filters listed below."
      )
    ).toBeInTheDocument()
    expect(screen.getByText("Banksy")).toBeInTheDocument()
    expect(screen.getByText("Prints")).toBeInTheDocument()
    expect(screen.getByText("Unique")).toBeInTheDocument()
  })
})
