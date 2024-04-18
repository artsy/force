import { screen } from "@testing-library/react"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ShelfArtwork", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: ShelfArtworkFragmentContainer,
    query: graphql`
      query ShelfArtwork_test_Query @relay_test_operation {
        artwork(id: "foo") {
          ...ShelfArtwork_artwork
        }
      }
    `,
  })

  it("renders isUnlisted (Exclusive Access) badge", () => {
    renderWithRelay({
      Artwork: () => ({
        isUnlisted: true,
      }),
    })

    expect(screen.getByText("Exclusive Access")).toBeInTheDocument()
  })
})
