import { act } from "@testing-library/react"
import {
  Order2CheckoutContext,
  Order2CheckoutContextProvider,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/Order2CheckoutContext"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
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

jest.mock(
  "Apps/Order2/Routes/Checkout/Hooks/useStripePaymentBySetupIntentId",
  () => ({
    useStripePaymentBySetupIntentId: (
      orderId: string,
      callback: () => void,
    ) => {
      callback()
    },
  }),
)

afterEach(() => {
  jest.clearAllMocks()
})

const { renderWithRelay } = setupTestWrapperTL<Order2CheckoutContextTestQuery>({
  Component: ({ viewer }: any) => {
    return (
      <Order2CheckoutContextProvider
        order={viewer.me.order}
        hasSavedAddresses={false}
      >
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
  submittedOffers: [],
  fulfillmentDetails: null,
  paymentMethod: null,
  paymentMethodDetails: null,
  lineItems: [
    {
      artworkVersion: {
        internalID: "artwork-version-1",
      },
      artwork: {
        slug: "test-artwork",
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
          "expressCheckoutState",
          "expressCheckoutPaymentMethods",
          "steps",
          "activeFulfillmentDetailsTab",
          "confirmationToken",
          "savePaymentMethod",
          "checkoutMode",
          "orderData",
          "router",
          "checkoutTracking",
        ]),
      )

      expect(Object.keys(actions)).toEqual(
        expect.arrayContaining([
          "setExpressCheckoutLoaded",
          "setExpressCheckoutState",
          "completeStep",
          "editStep",
          "editFulfillmentDetails",
          "setActiveFulfillmentDetailsTab",
          "setLoadingComplete",
          "setConfirmationToken",
          "setSavePaymentMethod",
          "redirectToOrderDetails",
          "setCheckoutMode",
        ]),
      )
    })

    it("initializes with correct default values", async () => {
      const { getState } = await setup()
      const state = getState()

      expect(state).toMatchObject({
        isLoading: true,
        expressCheckoutState: null,
        expressCheckoutPaymentMethods: null,
        activeFulfillmentDetailsTab: null,
        confirmationToken: null,
        savePaymentMethod: true,
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
      const { getState } = await setup({
        mode: "OFFER",
        pendingOffer: null,
      })
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
          step => step.name === CheckoutStepName.DELIVERY_OPTION,
        )
        expect(deliveryStep?.state).toBe(CheckoutStepState.HIDDEN)
      })
    })

    describe("completeStep", () => {
      it("marks the named step COMPLETED and activates the next step", async () => {
        const { getState, actions } = await setup()

        act(() => {
          actions.completeStep(CheckoutStepName.FULFILLMENT_DETAILS)
        })

        expect(
          getState().steps.find(
            step => step.name === CheckoutStepName.FULFILLMENT_DETAILS,
          )?.state,
        ).toBe(CheckoutStepState.COMPLETED)

        expect(
          getState().steps.find(
            step => step.name === CheckoutStepName.DELIVERY_OPTION,
          )?.state,
        ).toBe(CheckoutStepState.ACTIVE)
      })

      it("skips HIDDEN steps when activating the next step", async () => {
        const { getState, actions } = await setup({
          selectedFulfillmentOption: { type: "PICKUP" },
        })

        // FULFILLMENT_DETAILS is ACTIVE initially; complete it
        act(() => {
          actions.completeStep(CheckoutStepName.FULFILLMENT_DETAILS)
        })

        // DELIVERY_OPTION is HIDDEN — should stay HIDDEN
        expect(
          getState().steps.find(
            step => step.name === CheckoutStepName.DELIVERY_OPTION,
          )?.state,
        ).toBe(CheckoutStepState.HIDDEN)

        // PAYMENT should be activated instead
        expect(
          getState().steps.find(step => step.name === CheckoutStepName.PAYMENT)
            ?.state,
        ).toBe(CheckoutStepState.ACTIVE)
      })

      it("also completes preceding ACTIVE steps", async () => {
        const { getState, actions } = await setup()

        // Simulate saved-address flow: both steps ACTIVE simultaneously
        act(() => {
          actions.editStep(CheckoutStepName.DELIVERY_OPTION)
        })

        act(() => {
          actions.completeStep(CheckoutStepName.DELIVERY_OPTION)
        })

        expect(
          getState().steps.find(
            step => step.name === CheckoutStepName.FULFILLMENT_DETAILS,
          )?.state,
        ).toBe(CheckoutStepState.COMPLETED)

        expect(
          getState().steps.find(
            step => step.name === CheckoutStepName.DELIVERY_OPTION,
          )?.state,
        ).toBe(CheckoutStepState.COMPLETED)

        expect(
          getState().steps.find(step => step.name === CheckoutStepName.PAYMENT)
            ?.state,
        ).toBe(CheckoutStepState.ACTIVE)
      })

      it("does not activate a new step if one after the target is already ACTIVE", async () => {
        const { getState, actions } = await setup()

        // editFulfillmentDetails puts FD:ACTIVE and then completeStep(FD) should
        // leave DELIVERY_OPTION ACTIVE without activating PAYMENT
        act(() => {
          actions.completeStep(CheckoutStepName.FULFILLMENT_DETAILS)
          actions.completeStep(CheckoutStepName.DELIVERY_OPTION)
        })

        act(() => {
          actions.editFulfillmentDetails()
        })

        // Now FD:ACTIVE, DO:UPCOMING, PAYMENT:UPCOMING
        // Re-submit FD while DO is already UPCOMING (will be re-activated normally)
        act(() => {
          actions.completeStep(CheckoutStepName.FULFILLMENT_DETAILS)
        })

        expect(
          getState().steps.find(
            step => step.name === CheckoutStepName.DELIVERY_OPTION,
          )?.state,
        ).toBe(CheckoutStepState.ACTIVE)

        expect(
          getState().steps.find(step => step.name === CheckoutStepName.PAYMENT)
            ?.state,
        ).toBe(CheckoutStepState.UPCOMING)
      })
    })

    describe("editStep", () => {
      it("re-activates the target step and resets following steps to UPCOMING", async () => {
        const { getState, actions } = await setup()

        act(() => {
          actions.completeStep(CheckoutStepName.DELIVERY_OPTION)
          actions.completeStep(CheckoutStepName.PAYMENT)
        })

        act(() => {
          actions.editStep(CheckoutStepName.DELIVERY_OPTION)
        })

        expect(
          getState().steps.find(
            step => step.name === CheckoutStepName.DELIVERY_OPTION,
          )?.state,
        ).toBe(CheckoutStepState.ACTIVE)

        expect(
          getState().steps.find(step => step.name === CheckoutStepName.PAYMENT)
            ?.state,
        ).toBe(CheckoutStepState.UPCOMING)
      })

      it("leaves steps before the target unchanged", async () => {
        const { getState, actions } = await setup()

        act(() => {
          actions.completeStep(CheckoutStepName.FULFILLMENT_DETAILS)
          actions.completeStep(CheckoutStepName.DELIVERY_OPTION)
        })

        act(() => {
          actions.editStep(CheckoutStepName.PAYMENT)
        })

        expect(
          getState().steps.find(
            step => step.name === CheckoutStepName.FULFILLMENT_DETAILS,
          )?.state,
        ).toBe(CheckoutStepState.COMPLETED)
      })
    })

    describe("editFulfillmentDetails", () => {
      it("re-activates fulfillment details and resets DELIVERY_OPTION to UPCOMING", async () => {
        const { getState, actions } = await setup()

        act(() => {
          actions.completeStep(CheckoutStepName.FULFILLMENT_DETAILS)
          actions.completeStep(CheckoutStepName.DELIVERY_OPTION)
        })

        act(() => {
          actions.editFulfillmentDetails()
        })

        expect(
          getState().steps.find(
            step => step.name === CheckoutStepName.FULFILLMENT_DETAILS,
          )?.state,
        ).toBe(CheckoutStepState.ACTIVE)

        expect(
          getState().steps.find(
            step => step.name === CheckoutStepName.DELIVERY_OPTION,
          )?.state,
        ).toBe(CheckoutStepState.UPCOMING)

        expect(
          getState().steps.find(step => step.name === CheckoutStepName.PAYMENT)
            ?.state,
        ).toBe(CheckoutStepState.UPCOMING)
      })

      it("leaves DELIVERY_OPTION as UPCOMING if it has not been activated yet", async () => {
        const { getState, actions } = await setup()

        act(() => {
          actions.editFulfillmentDetails()
        })

        expect(
          getState().steps.find(
            step => step.name === CheckoutStepName.DELIVERY_OPTION,
          )?.state,
        ).toBe(CheckoutStepState.UPCOMING)
      })
    })

    describe("redirectToOrderDetails", () => {
      it("redirects to order details page", async () => {
        const { actions } = await setup()

        act(() => {
          actions.redirectToOrderDetails()
        })

        expect(mockRouter.replace).toHaveBeenCalledWith(
          "/orders/order-id/details",
        )
      })
    })
  })
})
