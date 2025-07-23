import {
  createContextStore,
  Action,
  action,
  Thunk,
  thunk,
  Computed,
  computed,
} from "easy-peasy"
import type {
  CheckoutLoadingError,
  CheckoutStep,
  ExpressCheckoutPaymentMethod,
  FulfillmentDetailsTab,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutTracking } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutTracking"
import { useRouter } from "System/Hooks/useRouter"
import { useCountdownTimer } from "Utils/Hooks/useCountdownTimer"
import createLogger from "Utils/logger"
import type {
  Order2CheckoutContext_order$data,
  Order2CheckoutContext_order$key,
} from "__generated__/Order2CheckoutContext_order.graphql"
import { every } from "lodash"
import { DateTime } from "luxon"
import type React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2CheckoutContext.tsx")
const MINIMUM_LOADING_MS = 1000
const CHECKOUT_MODE_STORAGE_KEY = "checkout_mode"

type CheckoutMode = "standard" | "express"

// Store model interface
interface Order2CheckoutStoreModel {
  // State
  isLoading: boolean
  expressCheckoutSubmitting: boolean
  loadingError: CheckoutLoadingError | null
  expressCheckoutPaymentMethods: ExpressCheckoutPaymentMethod[] | null
  steps: CheckoutStep[]
  activeFulfillmentDetailsTab: FulfillmentDetailsTab | null
  confirmationToken: any
  saveCreditCard: boolean
  savedCreditCard: any
  checkoutMode: CheckoutMode

  // Computed
  currentStepName: Computed<
    Order2CheckoutStoreModel,
    CheckoutStepName | undefined
  >

  // Actions
  setExpressCheckoutLoaded: Action<
    Order2CheckoutStoreModel,
    ExpressCheckoutPaymentMethod[]
  >
  setExpressCheckoutSubmitting: Action<Order2CheckoutStoreModel, boolean>
  setActiveFulfillmentDetailsTab: Action<
    Order2CheckoutStoreModel,
    FulfillmentDetailsTab | null
  >
  setLoadingError: Action<Order2CheckoutStoreModel, CheckoutLoadingError | null>
  setLoadingComplete: Action<Order2CheckoutStoreModel>
  setCheckoutMode: Action<Order2CheckoutStoreModel, CheckoutMode>
  setConfirmationToken: Action<
    Order2CheckoutStoreModel,
    { confirmationToken: any; saveCreditCard: boolean }
  >
  setSavedCreditCard: Action<Order2CheckoutStoreModel, { savedCreditCard: any }>

  // Step navigation actions
  setFulfillmentDetailsComplete: Action<
    Order2CheckoutStoreModel,
    { isPickup?: boolean }
  >
  setDeliveryOptionComplete: Action<Order2CheckoutStoreModel>
  editFulfillmentDetails: Action<Order2CheckoutStoreModel>
  editDeliveryOption: Action<Order2CheckoutStoreModel>
  editPayment: Action<Order2CheckoutStoreModel>
  paymentComplete: Action<
    Order2CheckoutStoreModel,
    { confirmationToken: any; saveCreditCard: boolean; savedCreditCard?: any }
  >

  // Thunks
  redirectToOrderDetails: Thunk<Order2CheckoutStoreModel, string>
}

// Helper functions from original
const getStorageValue = (key: string, defaultValue: string): string => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key)
    return saved !== null ? saved : defaultValue
  }
  return defaultValue
}

const setStorageValue = (key: string, value: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value)
  }
}

const validateOrder = (order: Order2CheckoutContext_order$data) => {
  const hasLineItemsWithData =
    order.lineItems.length &&
    every(order.lineItems, lineItem => {
      return !!lineItem?.artworkVersion?.internalID
    })

  if (!hasLineItemsWithData) {
    throw new Error("missing_line_item_data")
  }
  return
}

const initialStateForOrder = (
  order: Order2CheckoutContext_order$data,
): Omit<
  Order2CheckoutStoreModel,
  "currentStepName" | keyof ReturnType<typeof createContextStore>
> => {
  const savedCheckoutMode = getStorageValue(
    CHECKOUT_MODE_STORAGE_KEY,
    "standard",
  ) as CheckoutMode

  const stepNamesInOrder = [
    CheckoutStepName.FULFILLMENT_DETAILS,
    CheckoutStepName.DELIVERY_OPTION,
    CheckoutStepName.PAYMENT,
    CheckoutStepName.CONFIRMATION,
  ]

  if (order.mode === "OFFER") {
    stepNamesInOrder.unshift(CheckoutStepName.OFFER_AMOUNT)
  }

  const hasStripeConfirmationToken = !!order.stripeConfirmationToken

  const steps = stepNamesInOrder.map((stepName, index) => {
    if (stepName === CheckoutStepName.DELIVERY_OPTION) {
      return {
        name: stepName,
        state:
          order.selectedFulfillmentOption?.type === "PICKUP"
            ? CheckoutStepState.HIDDEN
            : CheckoutStepState.UPCOMING,
      }
    }

    if (stepName === CheckoutStepName.PAYMENT && hasStripeConfirmationToken) {
      return {
        name: stepName,
        state: CheckoutStepState.COMPLETED,
      }
    }

    return {
      name: stepName,
      state:
        index === 0 ? CheckoutStepState.ACTIVE : CheckoutStepState.UPCOMING,
    }
  })

  return {
    isLoading: true,
    expressCheckoutSubmitting: false,
    loadingError: null,
    expressCheckoutPaymentMethods: null,
    activeFulfillmentDetailsTab: null,
    confirmationToken: hasStripeConfirmationToken
      ? { id: order.stripeConfirmationToken }
      : null,
    saveCreditCard: true,
    savedCreditCard: null,
    steps,
    checkoutMode: savedCheckoutMode || "standard",
  }
}

// Create the context store
export const createOrder2CheckoutStore = (
  orderData: Order2CheckoutContext_order$data,
  router: ReturnType<typeof useRouter>["router"],
) => {
  const initialState = initialStateForOrder(orderData)

  return createContextStore<Order2CheckoutStoreModel>(() => ({
    // State
    ...initialState,

    // Computed
    currentStepName: computed(
      state =>
        state.steps.find(step => step.state === CheckoutStepState.ACTIVE)?.name,
    ),

    // Actions
    setExpressCheckoutLoaded: action((state, payload) => {
      if (state.isLoading && state.expressCheckoutPaymentMethods === null) {
        state.expressCheckoutPaymentMethods = payload
      }
    }),

    setExpressCheckoutSubmitting: action((state, payload) => {
      state.expressCheckoutSubmitting = payload
    }),

    setActiveFulfillmentDetailsTab: action((state, payload) => {
      state.activeFulfillmentDetailsTab = payload

      // Update delivery option step visibility
      state.steps = state.steps.map(step => {
        if (step.name === CheckoutStepName.DELIVERY_OPTION) {
          const shouldHide = payload === "PICKUP"
          if (shouldHide) {
            return { ...step, state: CheckoutStepState.HIDDEN }
          } else if (step.state === CheckoutStepState.HIDDEN) {
            return { ...step, state: CheckoutStepState.UPCOMING }
          }
        }
        return step
      })
    }),

    setLoadingError: action((state, payload) => {
      state.loadingError = payload
    }),

    setLoadingComplete: action(state => {
      state.isLoading = false
    }),

    setCheckoutMode: action((state, payload) => {
      setStorageValue(CHECKOUT_MODE_STORAGE_KEY, payload)
      state.checkoutMode = payload
    }),

    setConfirmationToken: action(
      (state, { confirmationToken, saveCreditCard }) => {
        state.confirmationToken = confirmationToken
        state.saveCreditCard = saveCreditCard
      },
    ),

    setSavedCreditCard: action((state, { savedCreditCard }) => {
      state.savedCreditCard = savedCreditCard
      state.saveCreditCard = false
      state.confirmationToken = null
    }),

    // Step navigation actions
    setFulfillmentDetailsComplete: action((state, { isPickup = false }) => {
      let hasActivatedNext = false

      state.steps = state.steps.map(step => {
        if (step.name === CheckoutStepName.FULFILLMENT_DETAILS) {
          return { ...step, state: CheckoutStepState.COMPLETED }
        }

        if (step.name === CheckoutStepName.DELIVERY_OPTION && isPickup) {
          return { ...step, state: CheckoutStepState.HIDDEN }
        }

        if (!hasActivatedNext && step.state === CheckoutStepState.UPCOMING) {
          hasActivatedNext = true
          return { ...step, state: CheckoutStepState.ACTIVE }
        }

        return step
      })
    }),

    setDeliveryOptionComplete: action(state => {
      state.steps = state.steps.reduce((acc, current) => {
        const isAfterDeliveryOptionsStep = acc
          .map(step => step.name)
          .includes(CheckoutStepName.DELIVERY_OPTION)

        if (
          isAfterDeliveryOptionsStep &&
          current.state !== CheckoutStepState.HIDDEN
        ) {
          const hasActivatedNext = acc.some(
            step => step.state === CheckoutStepState.ACTIVE,
          )
          return [
            ...acc,
            {
              ...current,
              state: hasActivatedNext
                ? CheckoutStepState.UPCOMING
                : CheckoutStepState.ACTIVE,
            },
          ]
        }

        if (current.name === CheckoutStepName.DELIVERY_OPTION) {
          return [...acc, { ...current, state: CheckoutStepState.COMPLETED }]
        }

        return [...acc, current]
      }, [] as CheckoutStep[])
    }),

    editFulfillmentDetails: action(state => {
      state.steps = state.steps.reduce((acc, current) => {
        const isAfterFulfillmentDetailsStep = acc
          .map(step => step.name)
          .includes(CheckoutStepName.FULFILLMENT_DETAILS)

        if (
          isAfterFulfillmentDetailsStep &&
          current.state !== CheckoutStepState.HIDDEN
        ) {
          return [...acc, { ...current, state: CheckoutStepState.UPCOMING }]
        }

        if (current.name === CheckoutStepName.FULFILLMENT_DETAILS) {
          return [...acc, { ...current, state: CheckoutStepState.ACTIVE }]
        }

        return [...acc, current]
      }, [] as CheckoutStep[])
    }),

    editDeliveryOption: action(state => {
      state.steps = state.steps.reduce((acc, current) => {
        const isAfterDeliveryOptionsStep = acc
          .map(step => step.name)
          .includes(CheckoutStepName.DELIVERY_OPTION)

        if (
          isAfterDeliveryOptionsStep &&
          current.state !== CheckoutStepState.HIDDEN
        ) {
          return [...acc, { ...current, state: CheckoutStepState.UPCOMING }]
        }

        if (current.name === CheckoutStepName.DELIVERY_OPTION) {
          return [...acc, { ...current, state: CheckoutStepState.ACTIVE }]
        }

        return [...acc, current]
      }, [] as CheckoutStep[])
    }),

    editPayment: action(state => {
      state.steps = state.steps.reduce((acc, current) => {
        const isAfterPaymentStep = acc
          .map(step => step.name)
          .includes(CheckoutStepName.PAYMENT)

        if (isAfterPaymentStep && current.state !== CheckoutStepState.HIDDEN) {
          return [...acc, { ...current, state: CheckoutStepState.UPCOMING }]
        }

        if (current.name === CheckoutStepName.PAYMENT) {
          return [...acc, { ...current, state: CheckoutStepState.ACTIVE }]
        }

        return [...acc, current]
      }, [] as CheckoutStep[])
    }),

    paymentComplete: action((state, payload) => {
      state.confirmationToken = payload.confirmationToken
      state.saveCreditCard = payload.saveCreditCard
      state.savedCreditCard = payload.savedCreditCard

      state.steps = state.steps.reduce((acc, current) => {
        if (current.name === CheckoutStepName.PAYMENT) {
          return [...acc, { ...current, state: CheckoutStepState.COMPLETED }]
        }

        if (
          current.state === CheckoutStepState.HIDDEN ||
          current.state === CheckoutStepState.COMPLETED
        ) {
          return [...acc, current]
        }

        const firstStepAfterCompleted =
          acc.find(step => step.state === CheckoutStepState.COMPLETED) &&
          !acc.find(step => step.state === CheckoutStepState.UPCOMING)

        if (firstStepAfterCompleted) {
          return [...acc, { ...current, state: CheckoutStepState.ACTIVE }]
        }

        return [...acc, current]
      }, [] as CheckoutStep[])
    }),

    // Thunks
    redirectToOrderDetails: thunk((_, orderID) => {
      const orderDetailsURL = `/orders/${orderID}/details`
      router.replace(orderDetailsURL)
    }),
  }))
}

// Export types
export type Order2CheckoutContextValue =
  ReturnType<typeof createOrder2CheckoutStore> extends ReturnType<
    typeof createContextStore<infer T>
  >
    ? T & {
        checkoutTracking: ReturnType<typeof useCheckoutTracking>
        partnerOffer: { timer: ReturnType<typeof useCountdownTimer> } | null
        redirectToOrderDetails: () => void
        setFulfillmentDetailsComplete: (args?: {
          isPickup?: boolean
          isFlatShipping?: boolean
        }) => void
        setDeliveryOptionComplete: () => void
        setConfirmationToken: (args: {
          confirmationToken: any
          saveCreditCard: boolean
        }) => void
        setSavedCreditCard: (args: { savedCreditCard: any }) => void
      }
    : never

// Provider component
export const Order2CheckoutContextProvider: React.FC<{
  order: Order2CheckoutContext_order$key
  children: React.ReactNode
}> = ({ order, children }) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const { router } = useRouter()
  const checkoutTracking = useCheckoutTracking(orderData)
  const partnerOffer = usePartnerOfferOnOrder(orderData)

  // Create store instance
  const store = useMemo(
    () => createOrder2CheckoutStore(orderData, router),
    [orderData, router],
  )

  const actions = store.useStoreActions(actions => actions)
  const state = store.useStoreState(state => state)

  // Loading management
  const [minimumLoadingPassed, setMinimumLoadingPassed] = useState(false)
  const [orderValidated, setOrderValidated] = useState(false)

  const isExpressCheckoutLoaded = state.expressCheckoutPaymentMethods !== null
  const isPartnerOfferLoadingComplete =
    !partnerOffer || !partnerOffer.timer.isLoading

  const checks = [
    minimumLoadingPassed,
    orderValidated,
    isExpressCheckoutLoaded,
    isPartnerOfferLoadingComplete,
  ]

  // Validate order
  useEffect(() => {
    if (orderValidated || !orderData) return

    try {
      validateOrder(orderData)
      setOrderValidated(true)
    } catch (error) {
      logger.error("Error validating order: ", error.message)
      actions.setLoadingError(error.message)
    }
  }, [orderData, orderValidated, actions])

  // Minimum loading timer
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMinimumLoadingPassed(true)
    }, MINIMUM_LOADING_MS)
    return () => clearTimeout(timeout)
  }, [])

  // Complete loading when all checks pass
  useEffect(() => {
    if (!state.isLoading) return

    if (checks.every(Boolean)) {
      actions.setLoadingComplete()
    }
  }, [...checks, state.isLoading, actions])

  // Build context value with wrapped methods
  const contextValue: Order2CheckoutContextValue = {
    ...state,
    ...actions,
    checkoutTracking,
    partnerOffer,

    // Wrapped methods for backward compatibility
    redirectToOrderDetails: useCallback(() => {
      actions.redirectToOrderDetails(orderData.internalID)
    }, [actions, orderData.internalID]),

    setFulfillmentDetailsComplete: useCallback(
      (args?: { isPickup?: boolean }) => {
        if (state.currentStepName !== CheckoutStepName.FULFILLMENT_DETAILS) {
          logger.error(
            `setFulfillmentDetailsComplete called when current step is not FULFILLMENT_DETAILS but ${state.currentStepName}`,
          )
          return
        }
        actions.setFulfillmentDetailsComplete({ isPickup: args?.isPickup })
      },
      [actions, state.currentStepName],
    ),

    setDeliveryOptionComplete: useCallback(() => {
      if (state.currentStepName !== CheckoutStepName.DELIVERY_OPTION) {
        logger.error(
          `setDeliveryOptionComplete called when current step is not DELIVERY_OPTION but ${state.currentStepName}`,
        )
        return
      }
      actions.setDeliveryOptionComplete()
    }, [actions, state.currentStepName]),

    setConfirmationToken: useCallback(
      (args: { confirmationToken: any; saveCreditCard: boolean }) => {
        actions.paymentComplete({ ...args })
      },
      [actions],
    ),

    setSavedCreditCard: useCallback(
      (args: { savedCreditCard: any }) => {
        actions.paymentComplete({
          savedCreditCard: args.savedCreditCard,
          saveCreditCard: false,
          confirmationToken: null,
        })
      },
      [actions],
    ),
  }

  return (
    <store.Provider>
      <Order2CheckoutContext.Provider value={contextValue}>
        {children}
      </Order2CheckoutContext.Provider>
    </store.Provider>
  )
}

// Original context for backward compatibility
export const Order2CheckoutContext =
  createContext<Order2CheckoutContextValue | null>(null)

// Fragment
const ORDER_FRAGMENT = graphql`
  fragment Order2CheckoutContext_order on Order {
    internalID
    mode
    source
    buyerStateExpiresAt
    stripeConfirmationToken
    selectedFulfillmentOption {
      type
    }
    lineItems {
      artworkVersion {
        internalID
      }
    }
  }
`

// Helper hook
const usePartnerOfferOnOrder = (orderData: {
  source: "PARTNER_OFFER" | unknown
  buyerStateExpiresAt?: string | null
}) => {
  const hasPartnerOffer = orderData.source === "PARTNER_OFFER"

  const partnerOfferEndTime =
    (hasPartnerOffer && orderData.buyerStateExpiresAt) || ""
  const partnerOfferStartTime = hasPartnerOffer
    ? DateTime.fromISO(partnerOfferEndTime).minus({ days: 3 }).toString()
    : ""

  const partnerOfferTimer = useCountdownTimer({
    startTime: partnerOfferStartTime,
    endTime: partnerOfferEndTime,
    imminentTime: 1,
  })

  return hasPartnerOffer ? { timer: partnerOfferTimer } : null
}
