import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ArtistRelatedGeneCategoriesFragmentContainer } from "../ArtistRelatedGeneCategories"

jest.unmock("react-relay")

describe("ArtistGenes", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: ArtistRelatedGeneCategoriesFragmentContainer,
    query: graphql`
      query ArtistRelatedGeneCategories_Test_Query @relay_test_operation {
        artist(id: "example") {
          ...ArtistRelatedGeneCategories_artist
        }
      }
    `,
  })

  it("does not render if no genes", () => {
    renderWithRelay({
      Artist: () => ({
        related: { genes: { edges: null } },
      }),
    })

    expect(screen.queryByText("Related Categories")).not.toBeInTheDocument()
  })

  it("renders correctly", () => {
    renderWithRelay({
      Artist: () => ({
        related: {
          genes: { edges: [{ node: { name: "example", href: "/gene/href" } }] },
        },
      }),
    })

    expect(screen.getByText("Related Categories")).toBeInTheDocument()
    expect(screen.queryAllByText("example")[0]).toBeInTheDocument()
  })
})
