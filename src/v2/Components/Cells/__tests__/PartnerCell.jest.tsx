import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { PartnerCellFragmentContainer_Test_Query } from "v2/__generated__/PartnerCellFragmentContainer_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { PartnerCellFragmentContainer } from "../PartnerCell"

jest.unmock("react-relay")

jest.mock("v2/Components/FollowButton/FollowProfileButton", () => ({
  FollowProfileButtonFragmentContainer: () => null,
}))

jest.mock("v2/System/Analytics/useTracking", () => ({
  useTracking: () => ({}),
}))

const { renderWithRelay } = setupTestWrapperTL<
  PartnerCellFragmentContainer_Test_Query
>({
  Component: PartnerCellFragmentContainer,
  query: graphql`
    query PartnerCellFragmentContainer_Test_Query @relay_test_operation {
      partner(id: "example") {
        ...PartnerCell_partner
      }
    }
  `,
})

describe("PartnerCell", () => {
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
