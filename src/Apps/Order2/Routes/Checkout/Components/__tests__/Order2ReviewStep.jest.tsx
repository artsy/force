import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2ReviewStepTestQuery } from "__generated__/Order2ReviewStepTestQuery.graphql"
import { graphql } from "react-relay"
import { Order2ReviewStep } from "../Order2ReviewStep"

jest.unmock("react-relay")

const mockStripe = {
  handleNextAction: jest.fn(),
}

jest.mock("@stripe/react-stripe-js", () => ({
  useStripe: jest.fn(() => mockStripe),
}))

const mockSubmitOrderMutation = {
  submitMutation: jest.fn(),
}

jest.mock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2SubmitOrderMutation",
  () => ({
    useOrder2SubmitOrderMutation: () => mockSubmitOrderMutation,
  }),
)

const mockCheckoutContext = {
  steps: [
    {
      name: "CONFIRMATION",
      state: "ACTIVE",
    },
  ],
  savePaymentMethod: false,
  redirectToOrderDetails: jest.fn(),
  checkoutTracking: {
    clickedOrderProgression: jest.fn(),
    submittedOrder: jest.fn(),
    clickedBuyerProtection: jest.fn(),
  },
  artworkPath: "/artwork/test-artwork",
  setCheckoutModalError: jest.fn(),
}

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => ({
  useCheckoutContext: () => mockCheckoutContext,
}))

const { renderWithRelay } = setupTestWrapperTL<Order2ReviewStepTestQuery>({
  Component: (props: any) => <Order2ReviewStep order={props.me.order} />,
  query: graphql`
    query Order2ReviewStepTestQuery @relay_test_operation {
      me {
        order(id: "order-id") {
          __typename
          ... on Order {
            ...Order2ReviewStep_order
          }
        }
      }
    }
  `,
})

describe("Order2ReviewStep", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("Submitting an offer order", () => {
    it("passes setupIntent ID correctly for offer orders requiring action", async () => {
      const mockSetupIntentId = "seti_test123"

      // First call returns action required
      mockSubmitOrderMutation.submitMutation.mockResolvedValueOnce({
        submitOrder: {
          orderOrError: {
            __typename: "OrderMutationActionRequired",
            actionData: {
              clientSecret: "test-secret",
            },
          },
        },
      })

      // Second call (after action) returns success
      mockSubmitOrderMutation.submitMutation.mockResolvedValueOnce({
        submitOrder: {
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: {
              internalID: "order-id",
            },
          },
        },
      })

      mockStripe.handleNextAction.mockResolvedValueOnce({
        setupIntent: { id: mockSetupIntentId },
      })

      renderWithRelay({
        Me: () => ({
          order: {
            __typename: "Order",
            internalID: "order-id",
            mode: "OFFER",
            stripeConfirmationToken: "ctoken_123",
            buyerTotal: { display: "$100" },
            itemsTotal: { display: "$90" },
            shippingTotal: { display: "$5" },
            taxTotal: { display: "$5" },
            lineItems: [
              {
                artworkOrEditionSet: {
                  __typename: "Artwork",
                  price: "$90",
                  dimensions: { in: "10 x 10", cm: "25 x 25" },
                },
                artworkVersion: {
                  title: "Test Artwork",
                  artistNames: "Test Artist",
                  date: "2024",
                  attributionClass: {
                    shortDescription: "Original",
                  },
                  image: {
                    resized: {
                      url: "https://test.com/image.jpg",
                    },
                  },
                },
              },
            ],
            pendingOffer: {
              internalID: "offer-id",
            },
          },
        }),
      })

      const submitButton = screen.getByText("Submit")
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(mockSubmitOrderMutation.submitMutation).toHaveBeenCalledTimes(2)
      })

      // First call should not have confirmedSetupIntentId
      const firstCallArgs =
        mockSubmitOrderMutation.submitMutation.mock.calls[0][0]
      expect(
        firstCallArgs.variables.input.confirmedSetupIntentId,
      ).toBeUndefined()
      expect(firstCallArgs.variables.input.offerID).toBe("offer-id")

      // Second call should have the setupIntent ID as a string
      const secondCallArgs =
        mockSubmitOrderMutation.submitMutation.mock.calls[1][0]
      expect(secondCallArgs.variables.input.confirmedSetupIntentId).toBe(
        mockSetupIntentId,
      )
      expect(typeof secondCallArgs.variables.input.confirmedSetupIntentId).toBe(
        "string",
      )
      expect(secondCallArgs.variables.input.offerID).toBe("offer-id")
    })
  })
})
