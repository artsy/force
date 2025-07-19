import { GeneFamiliesFragmentContainer } from "Apps/Categories/Components/GeneFamilies"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { render, screen } from "@testing-library/react"
import type { GeneFamilies_Test_Query } from "__generated__/GeneFamilies_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => false,
}))

const { renderWithRelay } = setupTestWrapperTL<GeneFamilies_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        <GeneFamiliesFragmentContainer {...(props as any)} />
      </MockBoot>
    )
  },
  query: graphql`
    query GeneFamilies_Test_Query @relay_test_operation {
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
