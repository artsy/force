import { screen } from "@testing-library/react"
import { CellSaleFragmentContainer } from "Components/Cells/CellSale"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { CellSaleFragmentContainer_Test_Query } from "__generated__/CellSaleFragmentContainer_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } =
  setupTestWrapperTL<CellSaleFragmentContainer_Test_Query>({
    Component: CellSaleFragmentContainer,
    query: graphql`
      query CellSaleFragmentContainer_Test_Query @relay_test_operation {
        sale(id: "example") {
          ...CellSale_sale
        }
      }
    `,
  })

describe("CellSale", () => {
  it("renders the component", () => {
    renderWithRelay({
      Sale: () => ({
        name: "Example Sale",
        formattedStartDateTime: "In Progress",
      }),
    })

    expect(screen.getByText("Example Sale")).toBeInTheDocument()
    expect(screen.getByText("In Progress")).toBeInTheDocument()
  })
})
