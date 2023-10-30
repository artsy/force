import { OwnerType } from "@artsy/cohesion"
import { render, screen } from "@testing-library/react"
import { ArtworkAuctionCreateAlertTooltip } from "Apps/Artwork/Components/ArtworkAuctionCreateAlertHeader/ArtworkAuctionCreateAlertTooltip"
import { SavedSearchAlertContextProvider } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { SavedSearchEntity } from "Components/SavedSearchAlert/types"

describe("ArtworkAuctionCreateAlertTooltip", () => {
  const savedSearchEntity: SavedSearchEntity = {
    defaultCriteria: {
      artistIDs: [
        {
          displayValue: "Andy Warhol",
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
        <ArtworkAuctionCreateAlertTooltip />
      </SavedSearchAlertContextProvider>
    )
  }

  it("renders correct text and pills", () => {
    renderComponent()

    expect(
      screen.getByText(
        "You may be interested in these similar works by Andy Warhol."
      )
    ).toBeInTheDocument()
    expect(screen.getByText("Andy Warhol")).toBeInTheDocument()
    expect(screen.getByText("Prints")).toBeInTheDocument()
    expect(screen.getByText("Unique")).toBeInTheDocument()
  })
})
