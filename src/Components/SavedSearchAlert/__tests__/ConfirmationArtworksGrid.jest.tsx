import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { ConfirmationArtworks } from "Components/SavedSearchAlert/ConfirmationArtworksGrid"
import { ConfirmationArtworksGrid_Test_Query } from "__generated__/ConfirmationArtworksGrid_Test_Query.graphql"

jest.unmock("react-relay")

describe("ConfirmationArtworksGrid", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    ConfirmationArtworksGrid_Test_Query
  >({
    Component: ConfirmationArtworks,
    query: graphql`
      query ConfirmationArtworksGrid_Test_Query($input: FilterArtworksInput)
        @relay_test_operation {
        artworksConnection(input: $input) {
          counts {
            total
          }

          edges {
            node {
              ...GridItem_artwork
            }
          }
        }
      }
    `,
  })

  it("renders aworks count and artworks grid", () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        counts: {
          total: 300,
        },
        edges: artworks,
      }),
    })

    expect(
      screen.getByText("300 works currently on Artsy match your criteria.")
    ).toBeInTheDocument()
    expect(screen.getByText("See our top picks for you:")).toBeInTheDocument()
  })
})

const artworks = [
  {
    node: {
      title: "Happy Choppers",
    },
  },
]
