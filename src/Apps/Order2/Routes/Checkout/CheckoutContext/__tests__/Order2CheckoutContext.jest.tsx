import {
  Order2CheckoutContext,
  Order2CheckoutContextProvider,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/Order2CheckoutContext"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { act } from "@testing-library/react"
import type { Order2CheckoutContextTestQuery } from "__generated__/Order2CheckoutContextTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const mockRouter = {
  replace: jest.fn(),
}

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    router: mockRouter,
  }),
}))

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutTracking", () => ({
  useCheckoutTracking: jest.fn(() => ({})),
}))

jest.mock("Utils/Hooks/useCountdownTimer", () => ({
  useCountdownTimer: jest.fn(() => ({
    isLoading: false,
  })),
}))

afterEach(() => {
  jest.clearAllMocks()
})

const { renderWithRelay } = setupTestWrapperTL<Order2CheckoutContextTestQuery>({
  Component: ({ viewer }: any) => {
    return (
      <Order2CheckoutContextProvider order={viewer.me.order}>
        <TestComponent />
      </Order2CheckoutContextProvider>
    )
  },
  query: graphql`
    query Order2CheckoutContextTestQuery @relay_test_operation {
      viewer {
        me {
          order(id: "order-id") {
            ...Order2CheckoutContext_order
          }
        }
      }
    }
  `,
})

// Test component that uses the context
const TestComponent = () => {
  const state = Order2CheckoutContext.useStoreState(state => state)
  const actions = Order2CheckoutContext.useStoreActions(state => state)

  // Attach to window for testing access
  ;(window as any).testContextState = state
  ;(window as any).testContextActions = actions

  return null
}

const baseOrderProps = {
  internalID: "order-id",
  mode: "BUY",
  source: "ARTWORK_PAGE",
  buyerStateExpiresAt: null,
  stripeConfirmationToken: null,
  selectedFulfillmentOption: null,
  offers: [],
  fulfillmentDetails: null,
  paymentMethod: null,
  paymentMethodDetails: null,
  lineItems: [
    {
      artworkVersion: {
        internalID: "artwork-version-1",
      },
    },
  ],
}

describe("Order2CheckoutContext", () => {
  const setup = async (orderProps = {}) => {
    await renderWithRelay({
      Viewer: () => ({
        me: {
          order: {
            ...baseOrderProps,
            ...orderProps,
          },
        },
      }),
    })

    return {
      getState: () => (window as any).testContextState,
      actions: (window as any).testContextActions,
    }
  }

  describe("initial state", () => {
    it("sets up initial context and action helpers", async () => {
      const { getState, actions } = await setup()

      expect(Object.keys(getState())).toEqual(
        expect.arrayContaining([
          "isLoading",
          "expressCheckoutSubmitting",
          "loadingError",
          "expressCheckoutPaymentMethods",
          "steps",
          "activeFulfillmentDetailsTab",
          "confirmationToken",
          "savePaymentMethod",
          "savedPaymentMethod",
          "checkoutMode",
          "orderData",
          "router",
          "checkoutTracking",
        ])
      )

      expect(Object.keys(actions)).toEqual(
        expect.arrayContaining([
          "setExpressCheckoutLoaded",
          "setExpressCheckoutSubmitting",
          "setFulfillmentDetailsComplete",
          "setActiveFulfillmentDetailsTab",
          "editFulfillmentDetails",
          "setDeliveryOptionComplete",
          "editDeliveryOption",
          "editPayment",
          "setLoadingError",
          "setLoadingComplete",
          "setPaymentComplete",
          "setConfirmationToken",
          "setSavePaymentMethod",
          "setSavedPaymentMethod",
          "redirectToOrderDetails",
          "setCheckoutMode",
        ])
      )
    })

    it("initializes with correct default values", async () => {
      const { getState } = await setup()
      const state = getState()

      expect(state).toMatchObject({
        isLoading: true,
        expressCheckoutSubmitting: false,
        loadingError: null,
        expressCheckoutPaymentMethods: null,
        activeFulfillmentDetailsTab: null,
        confirmationToken: null,
        savePaymentMethod: true,
        savedPaymentMethod: null,
        checkoutMode: "standard",
        orderData: expect.objectContaining({
          internalID: "order-id",
        }),
      })
    })

    it("creates steps with correct initial states for BUY mode", async () => {
      const { getState } = await setup()
      const state = getState()

      expect(state.steps).toEqual([
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.ACTIVE,
        },
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.UPCOMING,
        },
        { name: CheckoutStepName.PAYMENT, state: CheckoutStepState.UPCOMING },
        {
          name: CheckoutStepName.CONFIRMATION,
          state: CheckoutStepState.UPCOMING,
        },
      ])
    })

    it("adds offer amount step for OFFER mode orders", async () => {
      const { getState } = await setup({ mode: "OFFER" })
      const state = getState()

      expect(state.steps).toEqual([
        {
          name: CheckoutStepName.OFFER_AMOUNT,
          state: CheckoutStepState.ACTIVE,
        },
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.UPCOMING,
        },
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.UPCOMING,
        },
        { name: CheckoutStepName.PAYMENT, state: CheckoutStepState.UPCOMING },
        {
          name: CheckoutStepName.CONFIRMATION,
          state: CheckoutStepState.UPCOMING,
        },
      ])
    })

    it("hides delivery option step for pickup orders", async () => {
      const { getState } = await setup({
        selectedFulfillmentOption: {
          type: "PICKUP",
        },
      })
      const state = getState()

      expect(state.steps).toEqual([
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.ACTIVE,
        },
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.HIDDEN,
        },
        { name: CheckoutStepName.PAYMENT, state: CheckoutStepState.UPCOMING },
        {
          name: CheckoutStepName.CONFIRMATION,
          state: CheckoutStepState.UPCOMING,
        },
      ])
    })

    it("sets confirmation token when stripe token exists", async () => {
      const { getState } = await setup({
        stripeConfirmationToken: "stripe-token-123",
      })
      const state = getState()

      expect(state.confirmationToken).toEqual({
        id: "stripe-token-123",
      })

      expect(state.steps).toEqual([
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.ACTIVE,
        },
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.UPCOMING,
        },
        { name: CheckoutStepName.PAYMENT, state: CheckoutStepState.UPCOMING },
        {
          name: CheckoutStepName.CONFIRMATION,
          state: CheckoutStepState.UPCOMING,
        },
      ])
    })
  })

  describe("actions", () => {
    describe("setExpressCheckoutLoaded", () => {
      it("sets express checkout payment methods when loading", async () => {
        const { getState, actions } = await setup()

        const paymentMethods = [{ type: "apple_pay" }]

        act(() => {
          actions.setExpressCheckoutLoaded(paymentMethods as any)
        })

        expect(getState().expressCheckoutPaymentMethods).toEqual(paymentMethods)
      })

      it("does not set payment methods when not loading", async () => {
        const { getState, actions } = await setup()

        act(() => {
          actions.setLoadingComplete()
        })

        const paymentMethods = [{ type: "apple_pay" }]

        act(() => {
          actions.setExpressCheckoutLoaded(paymentMethods as any)
        })

        expect(getState().expressCheckoutPaymentMethods).toBe(null)
      })
    })

    describe("setActiveFulfillmentDetailsTab", () => {
      it("sets active fulfillment details tab", async () => {
        const { getState, actions } = await setup()

        act(() => {
          actions.setActiveFulfillmentDetailsTab("PICKUP")
        })

        expect(getState().activeFulfillmentDetailsTab).toBe("PICKUP")
      })

      it("hides delivery option step when pickup is selected", async () => {
        const { getState, actions } = await setup()

        act(() => {
          actions.setActiveFulfillmentDetailsTab("PICKUP")
        })

        const deliveryStep = getState().steps.find(
          step => step.name === CheckoutStepName.DELIVERY_OPTION
        )
        expect(deliveryStep?.state).toBe(CheckoutStepState.HIDDEN)
      })
    })

    describe("setFulfillmentDetailsComplete", () => {
      it("completes fulfillment details step and activates next step", async () => {
        const { getState, actions } = await setup()

        act(() => {
          actions.setFulfillmentDetailsComplete({})
        })

        const fulfillmentStep = getState().steps.find(
          step => step.name === CheckoutStepName.FULFILLMENT_DETAILS
        )
        expect(fulfillmentStep?.state).toBe(CheckoutStepState.COMPLETED)

        const deliveryStep = getState().steps.find(
          step => step.name === CheckoutStepName.DELIVERY_OPTION
        )
        expect(deliveryStep?.state).toBe(CheckoutStepState.ACTIVE)
      })

      it("hides delivery option step for pickup", async () => {
        const { getState, actions } = await setup()

        act(() => {
          actions.setFulfillmentDetailsComplete({ isPickup: true })
        })

        const deliveryStep = getState().steps.find(
          step => step.name === CheckoutStepName.DELIVERY_OPTION
        )
        expect(deliveryStep?.state).toBe(CheckoutStepState.HIDDEN)

        const paymentStep = getState().steps.find(
          step => step.name === CheckoutStepName.PAYMENT
        )
        expect(paymentStep?.state).toBe(CheckoutStepState.ACTIVE)
      })
    })

    describe("redirectToOrderDetails", () => {
      it("redirects to order details page", async () => {
        const { actions } = await setup()

        act(() => {
          actions.redirectToOrderDetails()
        })

        expect(mockRouter.replace).toHaveBeenCalledWith(
          "/orders/order-id/details"
        )
      })
    })
  })
})
