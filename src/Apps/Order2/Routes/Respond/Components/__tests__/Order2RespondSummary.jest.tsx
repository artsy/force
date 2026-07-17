import { fireEvent, screen, waitFor } from "@testing-library/react"
import { Order2RespondForm } from "Apps/Order2/Routes/Respond/Components/Order2RespondForm"
import { Order2RespondSummary } from "Apps/Order2/Routes/Respond/Components/Order2RespondSummary"
import { useOrder2AcceptOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2AcceptOfferMutation"
import { useOrder2CreateCounterOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2CreateCounterOfferMutation"
import { useOrder2DeclineOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2DeclineOfferMutation"
import { useOrder2SubmitCounterOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2SubmitCounterOfferMutation"
import { Order2RespondContextProvider } from "Apps/Order2/Routes/Respond/RespondContext/Order2RespondContext"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2RespondSummaryTestQuery } from "__generated__/Order2RespondSummaryTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")

jest.mock("@stripe/react-stripe-js", () => ({
  useStripe: () => ({ handleNextAction: jest.fn().mockResolvedValue({}) }),
}))

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "order-id",
    contextPageOwnerSlug: "page-owner-slug",
    contextPageOwnerType: "orders-respond",
  })),
}))

jest.mock(
  "Apps/Order2/Routes/Respond/Mutations/useOrder2CreateCounterOfferMutation",
)
jest.mock(
  "Apps/Order2/Routes/Respond/Mutations/useOrder2SubmitCounterOfferMutation",
)
jest.mock("Apps/Order2/Routes/Respond/Mutations/useOrder2AcceptOfferMutation")
jest.mock("Apps/Order2/Routes/Respond/Mutations/useOrder2DeclineOfferMutation")

const mockCreateCounterOffer = jest.fn()
const mockSubmitCounterOffer = jest.fn()
const mockAcceptOffer = jest.fn()
const mockDeclineOffer = jest.fn()

beforeEach(() => {
  mockCreateCounterOffer.mockReset().mockResolvedValue({
    createBuyerOffer: {
      offerOrError: {
        __typename: "OfferMutationSuccess",
        offer: { internalID: "counteroffer-id" },
      },
    },
  })
  mockSubmitCounterOffer.mockReset().mockResolvedValue({
    submitBuyerOffer: {
      offerOrError: {
        __typename: "OfferMutationSuccess",
        offer: { internalID: "counteroffer-id" },
      },
    },
  })
  mockAcceptOffer.mockReset().mockResolvedValue({
    acceptSellerOffer: {
      orderOrError: { __typename: "OrderMutationSuccess" },
    },
  })
  mockDeclineOffer.mockReset().mockResolvedValue({
    rejectSellerOffer: {
      orderOrError: { __typename: "OrderMutationSuccess" },
    },
  })
  ;(useOrder2CreateCounterOfferMutation as jest.Mock).mockReturnValue({
    submitMutation: mockCreateCounterOffer,
  })
  ;(useOrder2SubmitCounterOfferMutation as jest.Mock).mockReturnValue({
    submitMutation: mockSubmitCounterOffer,
  })
  ;(useOrder2AcceptOfferMutation as jest.Mock).mockReturnValue({
    submitMutation: mockAcceptOffer,
  })
  ;(useOrder2DeclineOfferMutation as jest.Mock).mockReturnValue({
    submitMutation: mockDeclineOffer,
  })
})

const { renderWithRelay } = setupTestWrapperTL<Order2RespondSummaryTestQuery>({
  Component: (props: any) => {
    const order = props.me?.order

    if (!order) {
      return null
    }

    return (
      <Order2RespondContextProvider order={order}>
        <Order2RespondForm order={order} />
        <Order2RespondSummary order={order} />
      </Order2RespondContextProvider>
    )
  },
  query: graphql`
    query Order2RespondSummaryTestQuery @relay_test_operation {
      me {
        order(id: "order-id") {
          ...Order2RespondContext_order
          ...Order2RespondForm_order
          ...Order2RespondSummary_order
        }
      }
    }
  `,
})

const defaultResolvers = {
  Order: () => ({ mode: "OFFER" }),
  Money: () => ({ display: "$1,000.00" }),
}

const continueButton = () =>
  screen.getByRole("button", { name: "Continue to Review" })

describe("Order2RespondSummary", () => {
  it("does not show the Submit CTA while the respond step is active", () => {
    renderWithRelay(defaultResolvers)

    expect(
      screen.queryByRole("button", { name: "Submit" }),
    ).not.toBeInTheDocument()
  })

  it("shows the Submit CTA once the response is confirmed", () => {
    renderWithRelay(defaultResolvers)

    fireEvent.click(screen.getByText("Accept gallery offer"))
    fireEvent.click(continueButton())

    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
  })

  it("accepts the gallery offer when Submit is clicked", async () => {
    renderWithRelay({
      Order: () => ({
        mode: "OFFER",
        internalID: "order-id",
        lastSubmittedOffer: { internalID: "gallery-offer-id" },
      }),
      Money: () => ({ display: "$1,000.00" }),
    })

    fireEvent.click(screen.getByText("Accept gallery offer"))
    fireEvent.click(continueButton())
    fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

    await waitFor(() => {
      expect(mockAcceptOffer).toHaveBeenCalledWith({
        variables: {
          input: { orderID: "order-id", offerID: "gallery-offer-id" },
        },
      })
    })
  })

  it("declines the gallery offer when Submit is clicked", async () => {
    renderWithRelay({
      Order: () => ({
        mode: "OFFER",
        internalID: "order-id",
        lastSubmittedOffer: { internalID: "gallery-offer-id" },
      }),
      Money: () => ({ display: "$1,000.00" }),
    })

    fireEvent.click(screen.getByText("Decline gallery offer"))
    fireEvent.click(continueButton())
    fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

    await waitFor(() => {
      expect(mockDeclineOffer).toHaveBeenCalledWith({
        variables: {
          input: { orderID: "order-id", offerID: "gallery-offer-id" },
        },
      })
    })
  })

  it("submits the pending counteroffer when Submit is clicked", async () => {
    const COUNTEROFFER_PLACEHOLDER = "Enter amount excluding shipping & tax"

    renderWithRelay({
      Order: () => ({
        mode: "OFFER",
        internalID: "order-id",
        pendingOffer: {
          internalID: "pending-offer-id",
          amount: { major: 500 },
        },
      }),
      Money: () => ({ display: "$1,000.00" }),
    })

    fireEvent.click(screen.getByText("Send counteroffer"))
    fireEvent.change(screen.getByPlaceholderText(COUNTEROFFER_PLACEHOLDER), {
      target: { value: "500" },
    })
    fireEvent.click(continueButton())

    const submitButton = await screen.findByRole("button", { name: "Submit" })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSubmitCounterOffer).toHaveBeenCalledWith({
        variables: {
          input: { orderID: "order-id", offerID: "pending-offer-id" },
        },
      })
    })
  })

  describe("analytics", () => {
    const mockTrackEvent = jest.fn()

    beforeAll(() => {
      ;(useTracking as jest.Mock).mockImplementation(() => ({
        trackEvent: mockTrackEvent,
      }))
    })

    afterEach(() => {
      mockTrackEvent.mockReset()
    })

    it("tracks clickedOrderProgression when Submit is clicked", async () => {
      renderWithRelay({
        Order: () => ({
          mode: "OFFER",
          internalID: "order-id",
          lastSubmittedOffer: { internalID: "gallery-offer-id" },
        }),
        Money: () => ({ display: "$1,000.00" }),
      })

      fireEvent.click(screen.getByText("Accept gallery offer"))
      fireEvent.click(continueButton())
      mockTrackEvent.mockClear()

      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: "clickedOrderProgression",
        context_module: "ordersReview",
        context_page_owner_id: "order-id",
        context_page_owner_type: "orders-respond",
        flow: "Make offer",
      })
    })

    it("tracks submittedCounterOffer when the counteroffer is submitted", async () => {
      const COUNTEROFFER_PLACEHOLDER = "Enter amount excluding shipping & tax"

      renderWithRelay({
        Order: () => ({
          mode: "OFFER",
          internalID: "order-id",
          pendingOffer: {
            internalID: "pending-offer-id",
            amount: { major: 500 },
          },
        }),
        Money: () => ({ display: "$1,000.00" }),
      })

      fireEvent.click(screen.getByText("Send counteroffer"))
      fireEvent.change(screen.getByPlaceholderText(COUNTEROFFER_PLACEHOLDER), {
        target: { value: "500" },
      })
      fireEvent.click(continueButton())
      fireEvent.click(await screen.findByRole("button", { name: "Submit" }))

      await waitFor(() => {
        expect(mockTrackEvent).toHaveBeenCalledWith({
          action: "submittedCounterOffer",
          context_module: "ordersReview",
          context_page_owner_id: "order-id",
          context_page_owner_type: "orders-respond",
        })
      })
    })

    it("tracks clickedTermsAndConditions when the terms link is clicked", async () => {
      renderWithRelay(defaultResolvers)

      fireEvent.click(screen.getByText("Accept gallery offer"))
      fireEvent.click(continueButton())
      mockTrackEvent.mockClear()

      fireEvent.click(
        await screen.findByText("General Terms and Conditions of Sale."),
      )

      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: "clickedTermsAndConditions",
        context_module: "ordersReview",
        context_page_owner_id: "order-id",
        context_page_owner_type: "orders-respond",
      })
    })
  })

  it("hides the Submit CTA again when the response is edited", () => {
    renderWithRelay(defaultResolvers)

    fireEvent.click(screen.getByText("Decline gallery offer"))
    fireEvent.click(continueButton())

    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Edit response" }))

    expect(
      screen.queryByRole("button", { name: "Submit" }),
    ).not.toBeInTheDocument()
  })

  it("prices the summary from the pending draft without disturbing the gallery-offer total shown elsewhere", () => {
    renderWithRelay({
      Me: () => ({
        order: {
          mode: "OFFER",
          internalID: "order-id",
          lastSubmittedOffer: {
            internalID: "gallery-offer-id",
            createdAt: "2025-01-01T00:00:00Z",
          },
          pendingOffer: {
            internalID: "pending-offer-id",
            createdAt: "2025-02-01T00:00:00Z", // after the gallery offer => current-round draft
            amount: { major: 200 },
            pricingBreakdownLines: [
              {
                __typename: "TotalLine",
                displayName: "Total",
                amount: { display: "Counteroffer $200" },
              },
            ],
          },
          // Order-level pricing = what accept/decline (priceFromPendingOffer={false})
          // shows. Per verified Exchange behavior, this is genuinely a separate,
          // independently-written value — not something the counteroffer draft
          // could have touched.
          pricingBreakdownLines: [
            {
              __typename: "TotalLine",
              displayName: "Total",
              amount: { display: "Order $100" },
            },
          ],
        },
      }),
    })

    // Selecting COUNTEROFFER flips the summary's priceFromPendingOffer gate on.
    fireEvent.click(screen.getByText("Send counteroffer"))

    expect(screen.getByText("Counteroffer $200")).toBeInTheDocument()
    expect(screen.getByText("Order $100")).toBeInTheDocument()
  })
})
