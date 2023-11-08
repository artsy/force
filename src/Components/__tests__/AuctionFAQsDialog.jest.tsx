import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { AuctionFAQsDialogFragmentContainer } from "Components/AuctionFAQsDialog"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: AuctionFAQsDialogFragmentContainer,
  query: graphql`
    query AuctionFAQsDialog_Test_Query @relay_test_operation {
      viewer {
        ...AuctionFAQsDialog_viewer
      }
    }
  `,
})

describe("AuctionFAQsDialog", () => {
  it("renders correctly", () => {
    const { wrapper } = getWrapper({
      Page: () => ({
        name: "How Auctions Work: Example",
        content: "<p>Hello world</p>",
      }),
    })

    const text = wrapper.text()

    expect(text).not.toContain("How Auctions Work:")
    expect(text).toContain("Example")
    expect(text).toContain("Hello world")
  })
})
