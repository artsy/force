import { AuctionFAQsDialogFragmentContainer } from "Components/AuctionFAQsDialog"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: AuctionFAQsDialogFragmentContainer,
  query: graphql`
    query AuctionFAQsDialogTestQuery @relay_test_operation {
      viewer {
        ...AuctionFAQsDialog_viewer
      }
    }
  `,
})

describe("AuctionFAQsDialog", () => {
  it("renders correctly", () => {
    const { container } = renderWithRelay({
      Page: () => ({
        name: "How Auctions Work: Example",
        content: "<p>Hello world</p>",
      }),
    })

    const text = container.textContent

    expect(text).not.toContain("How Auctions Work:")
    expect(text).toContain("Example")
    expect(text).toContain("Hello world")
  })
})
