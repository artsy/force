import { screen } from "@testing-library/react"
import { CategoriesAppFragmentContainer } from "Apps/Categories/CategoriesApp"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { CategoriesApp_Test_Query } from "__generated__/CategoriesApp_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

const { renderWithRelay } = setupTestWrapperTL<CategoriesApp_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        <CategoriesAppFragmentContainer {...(props as any)} />
      </MockBoot>
    )
  },
  query: graphql`
    query CategoriesApp_Test_Query @relay_test_operation {
      geneFamiliesConnection(first: 20) {
        ...CategoriesApp_geneFamiliesConnection
      }
    }
  `,
})

describe("CategoriesApp", () => {
  it("renders", () => {
    renderWithRelay()
    expect(screen.getByText("The Art Genome Project")).toBeInTheDocument()
  })

  it("displays families and genes", () => {
    renderWithRelay({
      GeneFamilyConnection: () => ({
        edges: [
          {
            node: {
              name: "Styles and Movements",
              genes: [
                {
                  displayName: "Early Randomcore",
                },
              ],
            },
          },
        ],
      }),
    })

    expect(
      screen.getByRole("heading", { name: "Styles and Movements" }),
    ).toBeInTheDocument()
  })
})
