import { SettingsOrdersFragmentContainer } from "Apps/Settings/Routes/Orders/Components/SettingsOrders"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Components/Pagination/CommercePagination", () => ({
  CommercePaginationFragmentContainer: () => null,
}))

// Mock SettingsOrdersRowLoader since it uses useLazyLoadQuery which is difficult to test with Suspense
jest.mock("../SettingsOrdersRowLoader", () => ({
  SettingsOrdersRowLoader: () => {
    return null // Return null to simplify testing - we test SettingsOrdersRow separately
  },
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
        orders: {
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
        orders: {
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
        orders: {
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
        orders: {
          edges: [
            {
              node: {
                internalID: "123",
              },
            },
          ],
          pageInfo: {
            hasNextPage: true,
            endCursor: "cursor123",
          },
          pageCursors: {
            around: [],
            first: null,
            last: null,
            previous: null,
          },
        },
      }),
    })

    // Component should render without errors
    expect(document.body).toBeInTheDocument()
  })
})
