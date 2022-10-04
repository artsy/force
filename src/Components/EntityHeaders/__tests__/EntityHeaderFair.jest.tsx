import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { EntityHeaderFairFragmentContainer_Test_Query } from "__generated__/EntityHeaderFairFragmentContainer_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { EntityHeaderFairFragmentContainer } from "Components/EntityHeaders/EntityHeaderFair"

jest.unmock("react-relay")

const QUERY = graphql`
  query EntityHeaderFairFragmentContainer_Test_Query @relay_test_operation {
    fair(id: "example") {
      ...EntityHeaderFair_fair
    }
  }
`

describe("EntityHeaderFair", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    EntityHeaderFairFragmentContainer_Test_Query
  >({
    Component: EntityHeaderFairFragmentContainer,
    query: QUERY,
  })

  it("renders the component", () => {
    renderWithRelay({
      Fair: () => ({ name: "Example Fair" }),
    })

    expect(screen.getByText("Example Fair")).toBeInTheDocument()
  })

  describe("without image", () => {
    it("renders the initials instead", () => {
      renderWithRelay({
        Fair: () => ({
          name: "Example Fair",
        }),
        Profile: () => ({
          initials: "EF",
        }),
      })

      expect(screen.getByText("EF")).toBeInTheDocument()
    })
  })
})
