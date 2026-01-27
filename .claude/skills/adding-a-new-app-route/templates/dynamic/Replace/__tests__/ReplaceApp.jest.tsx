import { screen } from "@testing-library/react"
import { ReplaceAppFragmentContainer } from "Apps/Replace/ReplaceApp"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ReplaceApp_Test_Query } from "__generated__/ReplaceApp_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<ReplaceApp_Test_Query>({
  Component: ReplaceAppFragmentContainer,
  query: graphql`
    query ReplaceApp_Test_Query @relay_test_operation {
      artist(id: "claude-monet") {
        ...ReplaceApp_artist
      }
    }
  `,
})

describe("ReplaceApp", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Claude Monet",
        biographyBlurb: {
          text: "Hello from Claude",
        },
      }),
    })

    expect(screen.getByText(/Welcome to your new page/)).toBeInTheDocument()
    expect(screen.getByText("Claude Monet")).toBeInTheDocument()
    expect(screen.getByText("Hello from Claude")).toBeInTheDocument()
  })
})
