import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2DetailsPage_Test_Query } from "__generated__/Order2DetailsPage_Test_Query.graphql"
import { graphql } from "react-relay"
import { Order2DetailsPage } from "../Order2DetailsPage"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<Order2DetailsPage_Test_Query>({
  Component: ({ me }) => me?.order && <Order2DetailsPage order={me.order!} />,
  query: graphql`
    query Order2DetailsPage_Test_Query @raw_response_type {
      me {
        order(id: "123") {
          ...Order2DetailsPage_order
        }
      }
    }
  `,
})

describe("Order2DetailsPage", () => {
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
    titleText: "Test Order Title",
  },
}
