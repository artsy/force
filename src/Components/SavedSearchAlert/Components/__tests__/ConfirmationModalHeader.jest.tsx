import { OwnerType } from "@artsy/cohesion"
import { render, screen } from "@testing-library/react"
import { ConfirmationModalHeader } from "Components/SavedSearchAlert/Components/ConfirmationModalHeader"
import { SavedSearchAlertContextProvider } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { SavedSearchEntity } from "Components/SavedSearchAlert/types"

describe("ConfirmationModalHeader", () => {
  it("renders title and pills", () => {
    const savedSearchEntity: SavedSearchEntity = {
      placeholder: "Test Artist",
      defaultCriteria: {
        artistIDs: [
          {
            displayValue: "Banksy",
            value: "4dd1584de0091e000100207c",
          },
        ],
      },
      owner: {
        type: OwnerType.artist,
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

    render(
      <SavedSearchAlertContextProvider
        entity={savedSearchEntity}
        criteria={criteria}
        aggregations={[]}
      >
        <ConfirmationModalHeader />
      </SavedSearchAlertContextProvider>
    )

    expect(
      screen.getByText("We will notify you when new works get added to Artsy.")
    ).toBeInTheDocument()
    expect(screen.getByText("Prints")).toBeInTheDocument()
    expect(screen.getByText("Unique")).toBeInTheDocument()
  })
})
