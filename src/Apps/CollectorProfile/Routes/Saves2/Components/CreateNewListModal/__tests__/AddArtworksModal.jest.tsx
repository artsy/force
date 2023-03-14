import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen, waitFor } from "@testing-library/react"
import { AddArtworksModal } from "Apps/CollectorProfile/Routes/Saves2/Components/CreateNewListModal/AddArtworksModal"
import { AddArtworksModal_me_Test_Query } from "__generated__/AddArtworksModal_me_Test_Query.graphql"

jest.unmock("react-relay")

const onCloseMock = jest.fn()
const onCompleteMock = jest.fn()

const { renderWithRelay } = setupTestWrapperTL<AddArtworksModal_me_Test_Query>({
  Component: () => {
    return (
      <AddArtworksModal
        onClose={onCloseMock}
        onComplete={onCompleteMock}
        listName="Photography"
      />
    )
  },
  query: graphql`
    query AddArtworksModal_me_Test_Query @relay_test_operation {
      me {
        ...AddArtworksModalContent_me @arguments(sort: POSITION_DESC)
      }
    }
  `,
})

describe("AddArtworksModal", () => {
  it("renders header", async () => {
    renderWithRelay({
      ArtworksConnection: () => [],
    })

    await waitForModalToBePresented()

    const entity = screen.getByText(
      "Photography created. Add saved works to the list."
    )
    expect(entity).toBeInTheDocument()
  })

  it("renders artworks count", async () => {
    renderWithRelay({
      ArtworksConnection: () => artworksConnection,
    })

    await waitForModalToBePresented()

    const artworkOne = screen.getByText("Artwork 1")

    expect(artworkOne).toBeInTheDocument()
  })
})

const waitForModalToBePresented = () => {
  return waitFor(() =>
    screen.getByText("Photography created. Add saved works to the list.")
  )
}

const artworksConnection = {
  edges: [
    { node: { internalID: "1", slug: "artwork-1", title: "Artwork 1" } },
    { node: { internalID: "2", slug: "artwork-2", title: "Artwork 2" } },
    { node: { internalID: "3", slug: "artwork-3", title: "Artwork 3" } },
  ],
}
