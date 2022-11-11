import { FairSubAppFragmentContainer } from "Apps/Fair/FairSubApp"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"

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
