import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import {
  ConfirmationArtworks,
  NUMBER_OF_ARTWORKS_TO_SHOW,
} from "Components/SavedSearchAlert/ConfirmationArtworksGrid"
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
          ...ArtworkGrid_artworks
        }
      }
    `,
  })

  it("renders artworks count and artworks grid", () => {
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

  it("displays the correct message when there are many matches", async () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        counts: {
          total: NUMBER_OF_ARTWORKS_TO_SHOW + 1,
        },
        edges: artworks,
      }),
    })

    expect(
      screen.getByText("11 works currently on Artsy match your criteria.")
    ).toBeInTheDocument()
    expect(screen.getByText("See our top picks for you:")).toBeInTheDocument()
  })

  it("displays the correct message when there are few matches", async () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        counts: {
          total: NUMBER_OF_ARTWORKS_TO_SHOW - 1,
        },
        edges: artworks,
      }),
    })

    expect(
      screen.getByText(
        "You might like these 9 works currently on Artsy that match your criteria:"
      )
    ).toBeInTheDocument()
  })

  it("displays the correct message when there are is one match", async () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        counts: {
          total: 1,
        },
        edges: artworks,
      }),
    })

    expect(
      screen.getByText(
        "You might like this 1 work currently on Artsy that matches your criteria:"
      )
    ).toBeInTheDocument()
  })

  it("displays the correct message when there are no matches", async () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        counts: {
          total: 0,
        },
        edges: artworks,
      }),
    })

    expect(
      screen.getByText(
        "There aren’t any works available that meet the criteria at this time."
      )
    ).toBeInTheDocument()
  })
})

const artworks = [
  {
    node: {
      title: "Happy Choppers",
    },
  },
]
