import { screen } from "@testing-library/react"
import { GeneFamiliesFragmentContainer } from "Apps/Categories/Components/GeneFamilies"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { GeneFamiliesTestQuery } from "__generated__/GeneFamiliesTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => false,
  __internal__useMatchMedia: () => false,
}))

const { renderWithRelay } = setupTestWrapperTL<GeneFamiliesTestQuery>({
  Component: props => {
    return (
      <MockBoot>
        <GeneFamiliesFragmentContainer {...(props as any)} />
      </MockBoot>
    )
  },
  query: graphql`
    query GeneFamiliesTestQuery @relay_test_operation {
      geneFamiliesConnection(first: 20) {
        ...GeneFamilies_geneFamiliesConnection
      }
    }
  `,
})

describe("GeneFamilies", () => {
  it("renders gene families", () => {
    renderWithRelay({
      GeneFamilyConnection: () => ({
        edges: [
          {
            node: {
              internalID: "12345",
              name: "Artistic Disciplines",
            },
          },
        ],
      }),
    })

    expect(screen.getByText("Artistic Disciplines")).toBeInTheDocument()
  })
})
