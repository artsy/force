import { screen } from "@testing-library/react"
import { ArtistRelatedGeneCategoriesFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistRelatedGeneCategories"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

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
