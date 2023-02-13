import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { SettingsPurchasesFragmentContainer } from "Apps/Settings/Routes/Purchases/Components/SettingsPurchases"

jest.unmock("react-relay")
jest.mock("Components/Pagination/CommercePagination", () => ({
  CommercePaginationFragmentContainer: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsPurchasesFragmentContainer,
  query: graphql`
    query SettingsPurchases_Test_Query @relay_test_operation {
      me {
        ...SettingsPurchases_me
      }
    }
  `,
})

describe("SettingsPurchases", () => {
  it("renders correctly", () => {
    renderWithRelay()

    expect(screen.getByText("Track Order")).toBeInTheDocument()
    expect(screen.getByText("Need Help?")).toBeInTheDocument()
  })

  it("renders correct help email address for non-PS orders", () => {
    renderWithRelay()

    expect(screen.getByText("Contact Us.")).toBeInTheDocument()
  })

  describe("with private sale orders", () => {
    it("renders correct help email address for PS orders", () => {
      renderWithRelay({
        Me: () => ({
          orders: {
            edges: [
              {
                node: {
                  code: "123",
                  source: "private_sale",
                },
              },
            ],
          },
        }),
      })

      expect(screen.getByText("privatesales@artsy.net")).toBeInTheDocument()
    })
  })
})
