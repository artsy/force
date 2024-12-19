import { screen } from "@testing-library/react"
import { FairSubAppFragmentContainer } from "Apps/Fair/FairSubApp"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Apps/Fair/Components/FairMeta", () => ({
  FairMetaFragmentContainer: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: FairSubAppFragmentContainer,
  query: graphql`
    query FairSubApp_Query @relay_test_operation {
      fair(id: "example") {
        ...FairSubApp_fair
      }
    }
  `,
})

describe("FairSubApp", () => {
  it("displays a back button", () => {
    renderWithRelay({
      Fair: () => ({ name: "Example Fair" }),
    })

    expect(screen.getByText("Back to Example Fair")).toBeInTheDocument()
  })
})
