import { fireEvent, screen, waitFor } from "@testing-library/react"
import { Order2RespondForm } from "Apps/Order2/Routes/Respond/Components/Order2RespondForm"
import { useOrder2CreateCounterOfferMutation } from "Apps/Order2/Routes/Respond/Mutations/useOrder2CreateCounterOfferMutation"
import { Order2RespondContextProvider } from "Apps/Order2/Routes/Respond/RespondContext/Order2RespondContext"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2RespondFormTestQuery } from "__generated__/Order2RespondFormTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")

jest.mock(
  "Apps/Order2/Routes/Respond/Mutations/useOrder2CreateCounterOfferMutation",
)

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "order-id",
    contextPageOwnerSlug: "page-owner-slug",
    contextPageOwnerType: "orders-respond",
  })),
}))

const COUNTEROFFER_PLACEHOLDER = "Enter amount excluding shipping & tax"

const mockCreateCounterOffer = jest.fn()

beforeEach(() => {
  mockCreateCounterOffer.mockReset()
  mockCreateCounterOffer.mockResolvedValue({
    createBuyerOffer: {
      offerOrError: {
        __typename: "OfferMutationSuccess",
        offer: { internalID: "counteroffer-id" },
      },
    },
  })
  ;(useOrder2CreateCounterOfferMutation as jest.Mock).mockReturnValue({
    submitMutation: mockCreateCounterOffer,
  })
})

const { renderWithRelay } = setupTestWrapperTL<Order2RespondFormTestQuery>({
  Component: (props: any) => {
    const order = props.me?.order

    if (!order) {
      return null
    }

    return (
      <Order2RespondContextProvider order={order}>
        <Order2RespondForm order={order} />
      </Order2RespondContextProvider>
    )
  },
  query: graphql`
    query Order2RespondFormTestQuery @relay_test_operation {
      me {
        order(id: "order-id") {
          ...Order2RespondContext_order
          ...Order2RespondForm_order
        }
      }
    }
  `,
})

const defaultResolvers = {
  Order: () => ({ mode: "OFFER", pendingOffer: null }),
  Money: () => ({ display: "$1,000.00", major: 1000, currencyCode: "USD" }),
}

const continueButton = () =>
  screen.getByRole("button", { name: "Continue to Review" })

describe("Order2RespondForm", () => {
  it("renders the three response options", () => {
    renderWithRelay(defaultResolvers)

    expect(screen.getByText("Accept gallery offer")).toBeInTheDocument()
    expect(screen.getByText("Send counteroffer")).toBeInTheDocument()
    expect(screen.getByText("Decline gallery offer")).toBeInTheDocument()
  })

  it("disables Continue to Review until an option is selected", () => {
    renderWithRelay(defaultResolvers)

    expect(continueButton()).toBeDisabled()

    fireEvent.click(screen.getByText("Accept gallery offer"))

    expect(continueButton()).toBeEnabled()
  })

  it("pre-fills the counteroffer input from a current-round draft", () => {
    renderWithRelay({
      Order: () => ({
        mode: "OFFER",
        // Draft created after the gallery offer it responds to.
        lastSubmittedOffer: { createdAt: "2024-01-01T00:00:00Z" },
        pendingOffer: {
          createdAt: "2024-01-02T00:00:00Z",
          amount: { major: 500 },
        },
      }),
    })

    fireEvent.click(screen.getByText("Send counteroffer"))

    expect(screen.getByPlaceholderText(COUNTEROFFER_PLACEHOLDER)).toHaveValue(
      "500",
    )
  })

  it("does not pre-fill from a stale draft left over from an earlier round", () => {
    renderWithRelay({
      Order: () => ({
        mode: "OFFER",
        // Pending offer predates the gallery’s latest counteroffer, so it is a
        // stale draft from a previous round and must be ignored.
        lastSubmittedOffer: { createdAt: "2024-01-02T00:00:00Z" },
        pendingOffer: {
          createdAt: "2024-01-01T00:00:00Z",
          amount: { major: 500 },
        },
      }),
    })

    fireEvent.click(screen.getByText("Send counteroffer"))

    expect(screen.getByPlaceholderText(COUNTEROFFER_PLACEHOLDER)).toHaveValue(
      "",
    )
  })

  it("reveals the counteroffer input only when Send counteroffer is selected", () => {
    renderWithRelay(defaultResolvers)

    expect(
      screen.queryByPlaceholderText(COUNTEROFFER_PLACEHOLDER),
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByText("Send counteroffer"))

    expect(
      screen.getByPlaceholderText(COUNTEROFFER_PLACEHOLDER),
    ).toBeInTheDocument()
  })

  it("reveals the decline warning only when Decline gallery offer is selected", () => {
    renderWithRelay(defaultResolvers)

    expect(
      screen.queryByText("Declining this offer ends this negotiation."),
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByText("Decline gallery offer"))

    expect(
      screen.getByText("Declining this offer ends this negotiation."),
    ).toBeInTheDocument()
  })

  it("keeps Continue to Review disabled for a counteroffer until an amount is entered", () => {
    renderWithRelay(defaultResolvers)

    fireEvent.click(screen.getByText("Send counteroffer"))
    expect(continueButton()).toBeDisabled()

    fireEvent.change(screen.getByPlaceholderText(COUNTEROFFER_PLACEHOLDER), {
      target: { value: "500" },
    })

    expect(continueButton()).toBeEnabled()
  })

  it("collapses to the completed state after accepting", () => {
    renderWithRelay(defaultResolvers)

    fireEvent.click(screen.getByText("Accept gallery offer"))
    fireEvent.click(continueButton())

    // Collapsed title (past tense) is shown
    expect(screen.getByText("Accepted gallery offer")).toBeInTheDocument()

    // The expanded form (options + CTA) is no longer shown
    expect(screen.queryByText("Accept gallery offer")).not.toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: "Continue to Review" }),
    ).not.toBeInTheDocument()
  })

  it("creates a counteroffer and shows the entered amount in the collapsed state", async () => {
    renderWithRelay(defaultResolvers)

    fireEvent.click(screen.getByText("Send counteroffer"))
    fireEvent.change(screen.getByPlaceholderText(COUNTEROFFER_PLACEHOLDER), {
      target: { value: "500" },
    })
    fireEvent.click(continueButton())

    await waitFor(() => {
      expect(screen.getByText("Your counteroffer")).toBeInTheDocument()
    })
    expect(screen.getByText("$500")).toBeInTheDocument()

    // The counteroffer is created against the gallery's offer, in minor units.
    expect(mockCreateCounterOffer).toHaveBeenCalledWith({
      variables: {
        input: expect.objectContaining({
          amountMinor: 50000,
          respondsToID: expect.any(String),
        }),
      },
    })
  })

  it("keeps the form open and surfaces an error when the counteroffer fails", async () => {
    mockCreateCounterOffer.mockResolvedValue({
      createBuyerOffer: {
        offerOrError: {
          __typename: "OfferMutationError",
          mutationError: { code: "invalid", message: "Offer too low" },
        },
      },
    })

    renderWithRelay(defaultResolvers)

    fireEvent.click(screen.getByText("Send counteroffer"))
    fireEvent.change(screen.getByPlaceholderText(COUNTEROFFER_PLACEHOLDER), {
      target: { value: "500" },
    })
    fireEvent.click(continueButton())

    await waitFor(() => {
      expect(screen.getByText("Offer too low")).toBeInTheDocument()
    })
    // Still on the editable form — not collapsed.
    expect(screen.queryByText("Your counteroffer")).not.toBeInTheDocument()
  })

  it("does not create an offer for accept or decline", () => {
    renderWithRelay(defaultResolvers)

    fireEvent.click(screen.getByText("Accept gallery offer"))
    fireEvent.click(continueButton())

    expect(screen.getByText("Accepted gallery offer")).toBeInTheDocument()
    expect(mockCreateCounterOffer).not.toHaveBeenCalled()
  })

  it("toggles the offer-details breakdown", () => {
    renderWithRelay(defaultResolvers)

    const toggle = screen.getByRole("button", { name: "Toggle offer details" })
    expect(toggle).toHaveAttribute("aria-expanded", "false")

    fireEvent.click(toggle)

    expect(toggle).toHaveAttribute("aria-expanded", "true")
  })

  it("returns to the editable form when Edit is clicked", () => {
    renderWithRelay(defaultResolvers)

    fireEvent.click(screen.getByText("Decline gallery offer"))
    fireEvent.click(continueButton())

    // Collapsed completed title for a decline (radios are no longer rendered)
    expect(screen.getByText("Decline gallery offer")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Edit response" }))

    expect(screen.getByText("Respond to gallery offer")).toBeInTheDocument()
    expect(screen.getByText("Decline gallery offer")).toBeInTheDocument()
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

    it.each([
      // accept/counter carry the gallery offer amount; decline carries none.
      ["Accept gallery offer", "accept", { amount: 1000, currency: "USD" }],
      ["Send counteroffer", "counter", { amount: 1000, currency: "USD" }],
      ["Decline gallery offer", "decline", {}],
    ])(
      "tracks clickedCounterOfferOption when %s is selected",
      (label, option, amountFields) => {
        renderWithRelay(defaultResolvers)

        fireEvent.click(screen.getByText(label))

        expect(mockTrackEvent).toHaveBeenCalledWith({
          action: "clickedCounterOfferOption",
          context_module: "ordersCounter",
          context_page_owner_id: "order-id",
          context_page_owner_type: "orders-respond",
          option,
          ...amountFields,
        })
      },
    )

    it("tracks clickedOrderProgression when Save and Review is clicked", () => {
      renderWithRelay(defaultResolvers)

      fireEvent.click(screen.getByText("Accept gallery offer"))
      mockTrackEvent.mockClear()

      fireEvent.click(saveButton())

      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: "clickedOrderProgression",
        context_module: "ordersCounter",
        context_page_owner_id: "order-id",
        context_page_owner_type: "orders-respond",
        flow: "Make offer",
      })
    })
  })
})
