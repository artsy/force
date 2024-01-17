import { screen } from "@testing-library/react"
import { SaleAppFragmentContainer } from "Apps/Sale/SaleApp"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Components/MetaTags", () => ({
  MetaTags: () => null,
}))

jest.mock("Apps/Sale/Components/SaleArtworks", () => ({
  SaleArtworkFilterRefetchContainer: () => null,
}))

jest.mock(
  "Apps/Auction/Components/AuctionDetails/AuctionDetailsStartTime",
  () => ({
    AuctionDetailsStartTimeQueryRenderer: () => null,
  })
)

const { renderWithRelay } = setupTestWrapperTL({
  Component: SaleAppFragmentContainer,
  query: graphql`
    query SaleApp_Test_Query @relay_test_operation {
      sale(id: "xxx") {
        ...SaleApp_sale
      }
    }
  `,
})

describe("SaleApp", () => {
  it("renders the Sale App", () => {
    renderWithRelay({
      Sale: () => ({
        name: "Timed Sale Test",
      }),
    })

    expect(screen.getByText("Timed Sale Test")).toBeInTheDocument()
  })
})
