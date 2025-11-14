import { CellShowFragmentContainer } from "Components/Cells/CellShow"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { CellShowFragmentContainer_Test_Query } from "__generated__/CellShowFragmentContainer_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } =
  setupTestWrapperTL<CellShowFragmentContainer_Test_Query>({
    Component: CellShowFragmentContainer,
    query: graphql`
      query CellShowFragmentContainer_Test_Query @relay_test_operation {
        show(id: "example") {
          ...CellShow_show
        }
      }
    `,
  })

describe("CellShow", () => {
  it("renders the component", () => {
    renderWithRelay({
      Show: () => ({
        name: "Example Show",
      }),
      Partner: () => ({
        name: "Example Partner",
      }),
    })

    expect(screen.getByText("Example Show")).toBeInTheDocument()
    expect(screen.getByText("Example Partner")).toBeInTheDocument()
  })
})
