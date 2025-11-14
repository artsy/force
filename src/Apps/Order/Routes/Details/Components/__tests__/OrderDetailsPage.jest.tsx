import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { OrderDetailsPage_Test_Query } from "__generated__/OrderDetailsPage_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { OrderDetailsPage } from "../OrderDetailsPage"

jest.unmock("react-relay")
jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "contextPageOwnerID",
    contextPageOwnerType: "orderDetails",
  })),
}))

const { renderWithRelay } = setupTestWrapperTL<OrderDetailsPage_Test_Query>({
  Component: ({ me }) => <OrderDetailsPage order={me!.order!} me={me!} />,
  query: graphql`
    query OrderDetailsPage_Test_Query @raw_response_type {
      me {
        ...OrderDetailsPage_me
        order(id: "123") {
          ...OrderDetailsPage_order
        }
      }
    }
  `,
})

describe("OrderDetailsPage", () => {
  const mockUseTracking = useTracking as jest.Mock
  const mockTrack = jest.fn()

  beforeEach(() => {
    mockTrack.mockClear()
    mockUseTracking.mockImplementation(() => ({ trackEvent: mockTrack }))
  })

  it("renders DetailsHeader with correct title text and order code", () => {
    renderWithRelay({
      Order: () => ({
        ...orderData,
      }),
    })

    expect(mockTrack).toHaveBeenCalledWith({
      action: "orderDetailsViewed",
      context_module: "ordersDetail",
      context_owner_id: "contextPageOwnerID",
      context_owner_type: "orderDetails",
      message_type: "APPROVED_PICKUP",
    })

    expect(screen.getByText("Test Order Title")).toBeInTheDocument()
    expect(screen.getByText("Order #123")).toBeInTheDocument()
  })
})

const orderData = {
  internalID: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
  code: "123",
  displayTexts: {
    messageType: "APPROVED_PICKUP",
    title: "Test Order Title",
  },
}
