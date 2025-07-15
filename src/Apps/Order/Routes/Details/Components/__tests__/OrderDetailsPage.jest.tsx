import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { OrderDetailsPage_Test_Query } from "__generated__/OrderDetailsPage_Test_Query.graphql"
import { graphql } from "react-relay"
import { OrderDetailsPage } from "../OrderDetailsPage"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<OrderDetailsPage_Test_Query>({
  Component: ({ me }) => me?.order && <OrderDetailsPage order={me.order!} />,
  query: graphql`
    query OrderDetailsPage_Test_Query @raw_response_type {
      me {
        order(id: "123") {
          ...OrderDetailsPage_order
        }
      }
    }
  `,
})

describe("OrderDetailsPage", () => {
  it("renders DetailsHeader with correct title text and order code", () => {
    renderWithRelay({
      Order: () => ({
        ...orderData,
      }),
    })

    expect(screen.getByText("Test Order Title")).toBeInTheDocument()
    expect(screen.getByText("Order #123")).toBeInTheDocument()
  })
})

const orderData = {
  internalID: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
  code: "123",
  displayTexts: {
    title: "Test Order Title",
  },
}
