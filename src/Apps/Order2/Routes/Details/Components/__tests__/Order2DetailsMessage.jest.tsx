import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2DetailsMessage_Test_Query } from "__generated__/Order2DetailsMessage_Test_Query.graphql"
import { graphql } from "react-relay"
import { Order2DetailsMessage } from "../Order2DetailsMessage"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<Order2DetailsMessage_Test_Query>(
  {
    Component: ({ me }) =>
      me?.order && <Order2DetailsMessage order={me.order} />,
    query: graphql`
      query Order2DetailsMessage_Test_Query @raw_response_type {
        me {
          order(id: "123") {
            ...Order2DetailsMessage_order
          }
        }
      }
    `,
  },
)

describe("Order2DetailsMessage", () => {
  const mockDate = "2024-03-20T15:30:00Z"

  it.each([
    ["SUBMITTED_ORDER", "Thank you! Your order is being processed"],
    ["SUBMITTED_OFFER", "Thank you! Your offer has been submitted"],
    ["PAYMENT_FAILED", "To complete your purchase"],
    ["PROCESSING_PAYMENT_PICKUP", "Thank you for your purchase"],
    ["PROCESSING_PAYMENT_SHIP", "Thank you for your purchase"],
    ["PROCESSING_WIRE", "Your order has been confirmed"],
    ["APPROVED_PICKUP", "Thank you for your purchase"],
    ["APPROVED_SHIP_EXPRESS", "Your order has been confirmed"],
    ["APPROVED_SHIP_STANDARD", "Your order has been confirmed"],
    ["APPROVED_SHIP_WHITE_GLOVE", "Your order has been confirmed"],
    ["APPROVED_SHIP", "Your order has been confirmed"],
    ["SHIPPED", "Your work is on its way"],
    ["COMPLETED_PICKUP", "We hope you love your purchase"],
    ["COMPLETED_SHIP", "We hope you love your purchase"],
    ["CANCELLED_ORDER", "You can contact"],
  ])("renders correct message for %s", (messageType, expectedText) => {
    renderWithRelay({
      Order: () => ({
        buyerStateExpiresAt: mockDate,
        code: "123",
        internalID: "test-id",
        displayTexts: {
          messageType,
        },
      }),
    })

    expect(screen.getByText(new RegExp(expectedText))).toBeInTheDocument()
  })

  it("renders wire transfer details for PROCESSING_WIRE", () => {
    renderWithRelay({
      Order: () => ({
        buyerStateExpiresAt: mockDate,
        code: "123",
        currencyCode: "USD",
        internalID: "test-id",
        displayTexts: {
          messageType: "PROCESSING_WIRE",
        },
      }),
    })

    expect(screen.getByText("Send wire transfer to")).toBeInTheDocument()
    expect(screen.getByText(/Account name: Art.sy Inc/)).toBeInTheDocument()
    expect(screen.getByText(/Account number: 4243851425/)).toBeInTheDocument()
    expect(screen.getByText(/Routing number: 121000248/)).toBeInTheDocument()
    expect(
      screen.getByText(/International SWIFT: WFBIUS6S/),
    ).toBeInTheDocument()
  })

  it("renders collection note for SHIPPED and COMPLETED states", () => {
    renderWithRelay({
      Order: () => ({
        buyerStateExpiresAt: mockDate,
        code: "123",
        internalID: "test-id",
        displayTexts: {
          messageType: "SHIPPED",
        },
      }),
    })

    expect(
      screen.getByText(/This artwork will be added to/),
    ).toBeInTheDocument()
    expect(screen.getByText(/your Collection on Artsy/)).toBeInTheDocument()
  })

  it("renders contact email link", () => {
    renderWithRelay({
      Order: () => ({
        buyerStateExpiresAt: mockDate,
        code: "123",
        internalID: "test-id",
        displayTexts: {
          messageType: "CANCELLED_ORDER",
        },
      }),
    })

    expect(screen.getByText("orders@artsy.net")).toBeInTheDocument()
  })

  describe("SHIPPED state tracking information", () => {
    it("renders tracking number as a link when tracking URL is present", () => {
      renderWithRelay({
        Order: () => ({
          displayTexts: {
            messageType: "SHIPPED",
          },
          deliveryInfo: {
            trackingNumber: "trackMe",
            trackingURL: "https://tracking.example.com/trackMe",
          },
        }),
      })

      const trackingLink = screen.getByRole("link", { name: "trackMe" })
      expect(trackingLink).toBeInTheDocument()
      expect(trackingLink).toHaveAttribute(
        "href",
        "https://tracking.example.com/trackMe",
      )
      expect(trackingLink).toHaveAttribute("target", "_blank")
    })
  })
})
