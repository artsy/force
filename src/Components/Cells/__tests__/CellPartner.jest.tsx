import { screen } from "@testing-library/react"
import { CellPartnerFragmentContainer } from "Components/Cells/CellPartner"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { CellPartnerFragmentContainer_Test_Query } from "__generated__/CellPartnerFragmentContainer_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Components/FollowButton/FollowProfileButton", () => ({
  FollowProfileButtonQueryRenderer: () => null,
}))

const { renderWithRelay } =
  setupTestWrapperTL<CellPartnerFragmentContainer_Test_Query>({
    Component: CellPartnerFragmentContainer,
    query: graphql`
      query CellPartnerFragmentContainer_Test_Query @relay_test_operation {
        partner(id: "example") {
          ...CellPartner_partner
        }
      }
    `,
  })

describe("CellPartner", () => {
  it("renders the component", () => {
    renderWithRelay({
      Partner: () => ({
        name: "Example Gallery",
      }),
    })

    expect(screen.getByText("Example Gallery")).toBeInTheDocument()
  })

  describe("without image", () => {
    it("renders the initials instead", () => {
      renderWithRelay({
        Profile: () => ({
          image: null,
        }),
        Partner: () => ({
          name: "Example Gallery",
          initials: "EG",
        }),
      })

      expect(screen.getByText("EG")).toBeInTheDocument()
    })
  })
})
