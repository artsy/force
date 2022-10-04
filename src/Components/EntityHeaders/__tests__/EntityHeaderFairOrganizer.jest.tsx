import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { EntityHeaderFairOrganizerFragmentContainer_Test_Query } from "__generated__/EntityHeaderFairOrganizerFragmentContainer_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { EntityHeaderFairOrganizerFragmentContainer } from "Components/EntityHeaders/EntityHeaderFairOrganizer"

jest.unmock("react-relay")

const QUERY = graphql`
  query EntityHeaderFairOrganizerFragmentContainer_Test_Query
    @relay_test_operation {
    fairOrganizer(id: "example") {
      ...EntityHeaderFairOrganizer_fairOrganizer
    }
  }
`

describe("EntityHeaderFairOrganizer", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    EntityHeaderFairOrganizerFragmentContainer_Test_Query
  >({
    Component: EntityHeaderFairOrganizerFragmentContainer,
    query: QUERY,
  })

  it("renders the component", () => {
    renderWithRelay({
      FairOrganizer: () => ({ name: "Example FairOrganizer" }),
      FairConnection: () => ({ totalCount: 999 }),
    })

    expect(screen.getByText("Example FairOrganizer")).toBeInTheDocument()
    expect(screen.getByText("999 Fairs")).toBeInTheDocument()
  })

  describe("without image", () => {
    it("renders the initials instead", () => {
      renderWithRelay({
        FairOrganizer: () => ({
          name: "Example FairOrganizer",
        }),
        Profile: () => ({
          initials: "EF",
        }),
      })

      expect(screen.getByText("EF")).toBeInTheDocument()
    })
  })
})
