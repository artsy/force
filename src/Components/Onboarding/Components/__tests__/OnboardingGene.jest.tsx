import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { OnboardingGeneFragmentContainer } from "../OnboardingGene"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: props => {
    return (
      // @ts-ignore
      <OnboardingGeneFragmentContainer
        {...props}
        description={<>Example description</>}
      />
    )
  },
  query: graphql`
    query OnboardingGene_Test_Query @relay_test_operation {
      gene(id: "example") {
        ...OnboardingGene_gene
      }
    }
  `,
})

describe("OnboardingGene", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Gene: () => ({
        name: "Example Gene",
      }),
    })

    expect(screen.getByText("Example Gene")).toBeInTheDocument()
    expect(screen.getByText("Example description")).toBeInTheDocument()
  })

  it("shows no results if none found", () => {
    renderWithRelay({
      Gene: () => ({
        artworks: { edges: [] },
      }),
    })

    expect(screen.getByText("No results found")).toBeInTheDocument()
  })
})
