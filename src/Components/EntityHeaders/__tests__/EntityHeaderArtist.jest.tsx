import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { EntityHeaderArtistFragmentContainer_Test_Query } from "__generated__/EntityHeaderArtistFragmentContainer_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"

jest.unmock("react-relay")

const QUERY = graphql`
  query EntityHeaderArtistFragmentContainer_Test_Query @relay_test_operation {
    artist(id: "example") {
      ...EntityHeaderArtist_artist
    }
  }
`

describe("EntityHeaderArtist", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    EntityHeaderArtistFragmentContainer_Test_Query
  >({
    Component: EntityHeaderArtistFragmentContainer,
    query: QUERY,
  })

  it("renders the component", () => {
    renderWithRelay({
      Artist: () => ({ name: "Example Artist" }),
    })

    expect(screen.getByText("Example Artist")).toBeInTheDocument()
  })

  describe("without image", () => {
    it("renders the initials instead", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Example Artist",
          initials: "EA",
        }),
      })

      expect(screen.getByText("EA")).toBeInTheDocument()
    })
  })

  describe("displayCounts", () => {
    const { renderWithRelay } = setupTestWrapperTL<
      EntityHeaderArtistFragmentContainer_Test_Query
    >({
      Component: props => {
        if (!props.artist) return null
        return (
          <EntityHeaderArtistFragmentContainer
            artist={props.artist}
            displayCounts
          />
        )
      },
      query: QUERY,
    })

    it("displays the counts", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Example Artist",
          counts: {
            artworks: 1,
            forSaleArtworks: 2,
          },
        }),
      })

      expect(screen.getByText("1 work, 2 for sale")).toBeInTheDocument()
    })

    it("displays the counts (2)", () => {
      renderWithRelay({
        Artist: () => ({
          name: "Example Artist",
          counts: {
            artworks: 10,
            forSaleArtworks: 1,
          },
        }),
      })

      expect(screen.getByText("10 works, 1 for sale")).toBeInTheDocument()
    })
  })
})
