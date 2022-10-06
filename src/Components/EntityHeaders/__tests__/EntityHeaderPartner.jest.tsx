import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { EntityHeaderPartnerFragmentContainer_Test_Query } from "__generated__/EntityHeaderPartnerFragmentContainer_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { EntityHeaderPartnerFragmentContainer } from "Components/EntityHeaders/EntityHeaderPartner"

jest.unmock("react-relay")

const QUERY = graphql`
  query EntityHeaderPartnerFragmentContainer_Test_Query @relay_test_operation {
    partner(id: "example") {
      ...EntityHeaderPartner_partner
    }
  }
`

describe("EntityHeaderPartner", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    EntityHeaderPartnerFragmentContainer_Test_Query
  >({
    Component: EntityHeaderPartnerFragmentContainer,
    query: QUERY,
  })

  it("renders the component", () => {
    renderWithRelay({
      Partner: () => ({
        name: "Example Partner",
        categories: [
          { name: "Example Category", slug: "example-category" },
          { name: "Black Owned", slug: "black-owned" },
        ],
      }),
      Location: () => ({ city: "New York" }),
    })

    expect(screen.getByText("Example Partner")).toBeInTheDocument()
    expect(screen.getByText("New York")).toBeInTheDocument()
    expect(screen.getByText("Black-Owned")).toBeInTheDocument()
    expect(screen.queryByText("Example Category")).not.toBeInTheDocument()
  })

  describe("without image", () => {
    it("renders the initials instead", () => {
      renderWithRelay({
        Partner: () => ({
          name: "Example Partner",
          initials: "EP",
        }),
      })

      expect(screen.getByText("EP")).toBeInTheDocument()
    })
  })
})
