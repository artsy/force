import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { EntityHeaderGeneFragmentContainer_Test_Query } from "__generated__/EntityHeaderGeneFragmentContainer_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { EntityHeaderGeneFragmentContainer } from "Components/EntityHeaders/EntityHeaderGene"

jest.unmock("react-relay")

const QUERY = graphql`
  query EntityHeaderGeneFragmentContainer_Test_Query @relay_test_operation {
    gene(id: "example") {
      ...EntityHeaderGene_gene
    }
  }
`

describe("EntityHeaderGene", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    EntityHeaderGeneFragmentContainer_Test_Query
  >({
    Component: EntityHeaderGeneFragmentContainer,
    query: QUERY,
  })

  it("renders the component", () => {
    renderWithRelay({
      Gene: () => ({ name: "Example Gene" }),
      FilterArtworksConnection: () => ({
        counts: { total: 12345 },
      }),
    })

    expect(screen.getByText("Example Gene")).toBeInTheDocument()
    expect(screen.getByText("12,345 artworks")).toBeInTheDocument()
  })

  describe("without image", () => {
    it("renders the initials instead", () => {
      renderWithRelay({
        Gene: () => ({
          name: "Example Gene",
        }),
      })

      expect(screen.getByText("E")).toBeInTheDocument()
    })
  })
})
