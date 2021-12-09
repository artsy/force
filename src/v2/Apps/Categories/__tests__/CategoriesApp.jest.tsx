import { graphql } from "react-relay"
import { MockBoot } from "v2/DevTools"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"
import { CategoriesAppFragmentContainer } from "../CategoriesApp"
import { CategoriesApp_Test_Query } from "v2/__generated__/CategoriesApp_Test_Query.graphql"

jest.unmock("react-relay")

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
      screen.getByRole("heading", { name: "Styles and Movements" })
    ).toBeInTheDocument()

    expect(
      screen.getByRole("link", { name: "Early Randomcore" })
    ).toBeInTheDocument()
  })
})
