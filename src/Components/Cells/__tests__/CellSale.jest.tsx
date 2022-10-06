import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { CellSaleFragmentContainer_Test_Query } from "__generated__/CellSaleFragmentContainer_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { CellSaleFragmentContainer } from "Components/Cells/CellSale"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  CellSaleFragmentContainer_Test_Query
>({
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
