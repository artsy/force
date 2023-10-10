import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { CellArtistFragmentContainer_Test_Query } from "__generated__/CellArtistFragmentContainer_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { CellArtistFragmentContainer } from "Components/Cells/CellArtist"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  CellArtistFragmentContainer_Test_Query
>({
  Component: CellArtistFragmentContainer,
  query: graphql`
    query CellArtistFragmentContainer_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...CellArtist_artist
      }
    }
  `,
})

describe("CellArtist", () => {
  it("renders the component", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Example Artist",
      }),
    })

    expect(screen.getByText("Example Artist")).toBeInTheDocument()
  })

  describe("without image", () => {
    it("renders the initials instead", () => {
      renderWithRelay({
        Artist: () => ({
          coverArtwork: null,
          initials: "EA",
        }),
      })

      expect(screen.getByText("EA")).toBeInTheDocument()
    })
  })
})
