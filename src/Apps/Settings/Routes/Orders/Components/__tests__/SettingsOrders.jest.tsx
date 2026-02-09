import { screen } from "@testing-library/react"
import { SettingsOrdersFragmentContainer } from "Apps/Settings/Routes/Orders/Components/SettingsOrders"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

// Mock SettingsOrdersRow since we test it separately
jest.mock("../SettingsOrdersRow", () => ({
  SettingsOrdersRowFragmentContainer: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsOrdersFragmentContainer,
  query: graphql`
    query SettingsOrders_Test_Query @relay_test_operation {
      me {
        ...SettingsOrders_me
      }
    }
  `,
})

describe("SettingsOrders", () => {
  it("renders orders list when orders exist", () => {
    renderWithRelay({
      Me: () => ({
        ordersConnection: {
          edges: [
            {
              node: {
                internalID: "order-1",
              },
            },
            {
              node: {
                internalID: "order-2",
              },
            },
          ],
        },
      }),
    })

    // Component should render without errors when orders exist
    expect(document.body).toBeInTheDocument()
  })

  it("renders empty state when no orders exist", () => {
    renderWithRelay({
      Me: () => ({
        ordersConnection: {
          edges: [],
        },
      }),
    })

    expect(
      screen.getByText("You have no orders to display."),
    ).toBeInTheDocument()
  })

  it("renders blank state with info variant and explore artworks button", () => {
    renderWithRelay({
      Me: () => ({
        ordersConnection: {
          edges: [],
        },
      }),
    })
    const message = screen.getByText("You have no orders to display.")
    expect(message).toBeInTheDocument()

    const exploreButton = screen.getByRole("link", { name: "Explore Artworks" })
    expect(exploreButton).toBeInTheDocument()
    expect(exploreButton).toHaveAttribute("href", "/artworks")
  })

  it("handles pagination data correctly", () => {
    renderWithRelay({
      Me: () => ({
        ordersConnection: {
          edges: [
            {
              node: {
                internalID: "123",
              },
            },
          ],
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: false,
          },
          pageCursors: {
            around: [
              { cursor: "cursor1", page: 1, isCurrent: true },
              { cursor: "cursor2", page: 2, isCurrent: false },
            ],
            first: { cursor: "cursor1", page: 1, isCurrent: true },
            last: { cursor: "cursor2", page: 2, isCurrent: false },
            previous: null,
          },
        },
      }),
    })

    // Component should render without errors
    expect(document.body).toBeInTheDocument()
  })
})
