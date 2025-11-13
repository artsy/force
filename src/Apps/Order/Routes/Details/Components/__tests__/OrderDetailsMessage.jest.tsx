import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { OrderDetailsMessage_Test_Query } from "__generated__/OrderDetailsMessage_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { OrderDetailsMessage } from "../OrderDetailsMessage"

jest.mock("react-tracking")

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "test-id",
    contextPageOwnerType: "orders-detail",
  })),
}))

jest.unmock("react-relay")
const trackEvent = jest.fn()

const { renderWithRelay } = setupTestWrapperTL<OrderDetailsMessage_Test_Query>({
  Component: ({ me }) => <OrderDetailsMessage order={me!.order!} me={me!} />,
  query: graphql`
    query OrderDetailsMessage_Test_Query @raw_response_type {
      me {
        ...OrderDetailsMessage_me
        order(id: "123") {
          ...OrderDetailsMessage_order
        }
      }
    }
  `,
})

describe("OrderDetailsMessage", () => {
  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent,
    }))
  })
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
    ["CANCELED", "Your order could not be processed. You can contact"],
    [
      "DECLINED_BY_BUYER",
      "Thank you for your response. The seller will be informed of your decision to decline the offer, ending the current negotiation.",
    ],
    [
      "DECLINED_BY_SELLER",
      "Unfortunately, the seller declined your offer, ending the current negotiation.",
    ],
    [
      "REFUNDED",
      "Your refund will appear on your bank statement within 5-7 business days.",
    ],
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

  it("renders collector profile prompt for SUBMITTED_OFFER with incomplete profile", () => {
    renderWithRelay({
      Order: () => ({
        buyerStateExpiresAt: mockDate,
        code: "123",
        internalID: "test-id",
        displayTexts: {
          messageType: "SUBMITTED_OFFER",
        },
        impulseConversationId: "conv-123",
      }),
      Me: () => ({
        collectorProfile: { bio: "" },
      }),
    })
    expect(
      screen.getByRole("link", { name: "completing your profile" })
    ).toHaveAttribute("href", "/settings/edit-profile")
  })

  it("tracks complete your profile click", () => {
    renderWithRelay({
      Order: () => ({
        buyerStateExpiresAt: mockDate,
        code: "123",
        internalID: "test-id",
        displayTexts: {
          messageType: "SUBMITTED_OFFER",
        },
        impulseConversationId: "conv-123",
      }),
      Me: () => ({
        collectorProfile: { bio: "" },
      }),
    })

    const profileLink = screen.getByRole("link", {
      name: "completing your profile",
    })

    profileLink.click()

    expect(trackEvent).toBeCalledWith({
      action: "clickedCompleteYourProfile",
      context_module: "ordersDetail",
      context_page_owner_type: "orders-detail",
      context_page_owner_id: "test-id",
    })
  })

  it("renders collector profile prompt for SUBMITTED_ORDER with incomplete profile", () => {
    renderWithRelay({
      Order: () => ({
        buyerStateExpiresAt: mockDate,
        code: "123",
        internalID: "test-id",
        displayTexts: {
          messageType: "SUBMITTED_ORDER",
        },
        impulseConversationId: "conv-123",
      }),
      Me: () => ({
        collectorProfile: { bio: "" },
      }),
    })
    expect(
      screen.getByRole("link", { name: "completing your profile" })
    ).toHaveAttribute("href", "/settings/edit-profile")
  })

  it("renders contact gallery link for SUBMITTED_OFFER", () => {
    renderWithRelay({
      Order: () => ({
        buyerStateExpiresAt: mockDate,
        code: "123",
        internalID: "test-id",
        displayTexts: {
          messageType: "SUBMITTED_OFFER",
        },
        impulseConversationId: "conv-123",
      }),
    })
    expect(
      screen.getByRole("link", { name: "contact the gallery" })
    ).toHaveAttribute("href", "/user/conversations/conv-123")
  })

  it("tracks contact gallery click", () => {
    renderWithRelay({
      Order: () => ({
        buyerStateExpiresAt: mockDate,
        code: "123",
        internalID: "test-id",
        displayTexts: {
          messageType: "SUBMITTED_OFFER",
        },
        impulseConversationId: "conv-123",
      }),
    })

    const contactLink = screen.getByRole("link", {
      name: "contact the gallery",
    })
    contactLink.click()
    expect(trackEvent).toBeCalledWith({
      action: "clickedContactGallery",
      context_owner_id: "test-id",
      context_owner_type: "orders-detail",
    })
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
      screen.getByText(/International SWIFT: WFBIUS6S/)
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
      screen.getByText(/This artwork will be added to/)
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
          messageType: "CANCELED",
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
        "https://tracking.example.com/trackMe"
      )
      expect(trackingLink).toHaveAttribute("target", "_blank")
    })
  })
})
