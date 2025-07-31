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
import { type Action, action, createContextStore } from "easy-peasy"
import { every } from "lodash"
import { DateTime } from "luxon"
import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2CheckoutContext.tsx")
const MINIMUM_LOADING_MS = 1000
const CHECKOUT_MODE_STORAGE_KEY = "checkout_mode"

type CheckoutMode = "standard" | "express"

type ConfirmationTokenState = {
  id: string
  paymentMethodPreview?:
    | {
        readonly __typename: "Card"
        readonly displayBrand: string
        readonly last4: string
      }
    | {
        readonly __typename: "USBankAccount"
        readonly bankName: string
        readonly last4: string
      }
    | {
        readonly __typename: "SEPADebit"
        readonly last4: string
      }
    | null
    | undefined
} | null

type SavedCreditCard = {
  internalID: string
  brand: string
  lastDigits: string
}

export interface Order2CheckoutModel {
  // State
  isLoading: boolean
  /** Order is redirecting to the details page */
  expressCheckoutSubmitting: boolean
  loadingError: CheckoutLoadingError | null
  expressCheckoutPaymentMethods: ExpressCheckoutPaymentMethod[] | null
  steps: CheckoutStep[]
  activeFulfillmentDetailsTab: FulfillmentDetailsTab | null
  confirmationToken: ConfirmationTokenState
  saveCreditCard: boolean
  savedCreditCard: SavedCreditCard | null
  checkoutMode: CheckoutMode

  // External data - passed in as runtime props
  checkoutTracking: ReturnType<typeof useCheckoutTracking>
  router: ReturnType<typeof useRouter>["router"]
  orderData: Order2CheckoutContext_order$data
  partnerOffer: {
    timer: ReturnType<typeof useCountdownTimer>
  } | null

  // Actions
  setExpressCheckoutLoaded: Action<this, ExpressCheckoutPaymentMethod[]>
  setExpressCheckoutSubmitting: Action<this, boolean>
  setFulfillmentDetailsComplete: Action<
    this,
    { isPickup?: boolean; isFlatShipping?: boolean }
  >
  setActiveFulfillmentDetailsTab: Action<this, FulfillmentDetailsTab | null>
  editFulfillmentDetails: Action<this>
  setDeliveryOptionComplete: Action<this>
  editDeliveryOption: Action<this>
  editPayment: Action<this>
  setLoadingError: Action<this, CheckoutLoadingError | null>
  setLoadingComplete: Action<this>
  setConfirmationToken: Action<
    this,
    { confirmationToken: ConfirmationTokenState; saveCreditCard: boolean }
  >
  setSavedCreditCard: Action<this, { savedCreditCard: SavedCreditCard }>
  redirectToOrderDetails: Action<this>
  setCheckoutMode: Action<this, CheckoutMode>
}

export const Order2CheckoutContext: ReturnType<
  typeof createContextStore<Order2CheckoutModel>
> = createContextStore<Order2CheckoutModel>(initialState => ({
  // Initial state with defaults
  isLoading: true,
  expressCheckoutSubmitting: false,
  loadingError: null,
  expressCheckoutPaymentMethods: null,
  activeFulfillmentDetailsTab: null,
  confirmationToken: null,
  saveCreditCard: true,
  savedCreditCard: null,
  checkoutMode: "standard",
  steps: [],

  // Required runtime props - will be provided by Provider
  // These will be overridden by the Provider with actual values
  checkoutTracking: null as any,
  router: null as any,
  orderData: null as any,
  partnerOffer: null,

  // Override with initialState values if provided
  ...initialState,

  // Actions
  setExpressCheckoutLoaded: action((state, availablePaymentMethods) => {
    if (state.isLoading && state.expressCheckoutPaymentMethods === null) {
      state.expressCheckoutPaymentMethods = availablePaymentMethods
    }
  }),

  setExpressCheckoutSubmitting: action((state, isSubmitting) => {
    state.expressCheckoutSubmitting = isSubmitting
  }),

  setActiveFulfillmentDetailsTab: action(
    (state, activeFulfillmentDetailsTab) => {
      state.activeFulfillmentDetailsTab = activeFulfillmentDetailsTab

      // Update delivery option step visibility based on pickup selection
      state.steps = state.steps.map(step => {
        if (step.name === CheckoutStepName.DELIVERY_OPTION) {
          const shouldHide = activeFulfillmentDetailsTab === "PICKUP"
          if (shouldHide) {
            return {
              ...step,
              state: CheckoutStepState.HIDDEN,
            }
          } else if (step.state === CheckoutStepState.HIDDEN) {
            return {
              ...step,
              state: CheckoutStepState.UPCOMING,
            }
          }
        }
        return step
      })
    },
  ),

  setLoadingError: action((state, error) => {
    state.loadingError = error
  }),

  setLoadingComplete: action(state => {
    state.isLoading = false
  }),

  setCheckoutMode: action((state, mode) => {
    setStorageValue(CHECKOUT_MODE_STORAGE_KEY, mode)
    state.checkoutMode = mode
  }),

  setFulfillmentDetailsComplete: action((state, args) => {
    const isPickup = args?.isPickup ?? false

    const currentStepName = state.steps.find(
      step => step.state === CheckoutStepState.ACTIVE,
    )?.name

    if (currentStepName !== CheckoutStepName.FULFILLMENT_DETAILS) {
      logger.error(
        `setFulfillmentDetailsComplete called when current step is not FULFILLMENT_DETAILS but ${currentStepName}`,
      )
      return
    }

    let hasActivatedNext = false
    state.steps = state.steps.map(step => {
      // Mark fulfillment details as completed
      if (step.name === CheckoutStepName.FULFILLMENT_DETAILS) {
        return { ...step, state: CheckoutStepState.COMPLETED }
      }

      // Hide delivery option if pickup is selected
      if (step.name === CheckoutStepName.DELIVERY_OPTION && isPickup) {
        return { ...step, state: CheckoutStepState.HIDDEN }
      }

      // Activate the first upcoming step
      if (!hasActivatedNext && step.state === CheckoutStepState.UPCOMING) {
        hasActivatedNext = true
        return { ...step, state: CheckoutStepState.ACTIVE }
      }

      return step
    })
  }),

  setDeliveryOptionComplete: action(state => {
    const currentStepName = state.steps.find(
      step => step.state === CheckoutStepState.ACTIVE,
    )?.name

    if (currentStepName !== CheckoutStepName.DELIVERY_OPTION) {
      logger.error(
        `setDeliveryOptionComplete called when current step is not DELIVERY_OPTION but ${currentStepName}`,
      )
      return
    }

    const newSteps: CheckoutStep[] = []
    let hasActivatedNext = false

    for (const step of state.steps) {
      if (step.name === CheckoutStepName.DELIVERY_OPTION) {
        newSteps.push({
          ...step,
          state: CheckoutStepState.COMPLETED,
        })
      } else {
        const isAfterDeliveryOptionsStep = newSteps
          .map(s => s.name)
          .includes(CheckoutStepName.DELIVERY_OPTION)

        if (
          isAfterDeliveryOptionsStep &&
          step.state !== CheckoutStepState.HIDDEN
        ) {
          if (!hasActivatedNext) {
            hasActivatedNext = true
            newSteps.push({
              ...step,
              state: CheckoutStepState.ACTIVE,
            })
          } else {
            newSteps.push({
              ...step,
              state: CheckoutStepState.UPCOMING,
            })
          }
        } else {
          newSteps.push(step)
        }
      }
    }

    state.steps = newSteps
  }),

  setConfirmationToken: action(
    (state, { confirmationToken, saveCreditCard }) => {
      const newSteps: CheckoutStep[] = []
      let hasActivatedNext = false

      for (const step of state.steps) {
        if (step.name === CheckoutStepName.PAYMENT) {
          newSteps.push({
            ...step,
            state: CheckoutStepState.COMPLETED,
          })
        } else {
          const shouldBeHidden = step.state === CheckoutStepState.HIDDEN
          if (shouldBeHidden) {
            newSteps.push(step)
            continue
          }

          if (step.state === CheckoutStepState.COMPLETED) {
            newSteps.push(step)
            continue
          }

          // We've already returned if it is completed or hidden, so this
          // must be an upcoming step. If it is the first one, then
          // we activate it, otherwise we leave it as upcoming.
          const hasCompletedStep = newSteps.find(
            s => s.state === CheckoutStepState.COMPLETED,
          )
          const hasUpcomingStep = newSteps.find(
            s => s.state === CheckoutStepState.UPCOMING,
          )

          if (hasCompletedStep && !hasUpcomingStep && !hasActivatedNext) {
            hasActivatedNext = true
            newSteps.push({
              ...step,
              state: CheckoutStepState.ACTIVE,
            })
          } else {
            newSteps.push(step)
          }
        }
      }

      state.confirmationToken = confirmationToken
      state.saveCreditCard = saveCreditCard
      state.steps = newSteps
    },
  ),

  setSavedCreditCard: action((state, { savedCreditCard }) => {
    // Update payment completion logic similar to setConfirmationToken
    const newSteps: CheckoutStep[] = []
    let hasActivatedNext = false

    for (const step of state.steps) {
      if (step.name === CheckoutStepName.PAYMENT) {
        newSteps.push({
          ...step,
          state: CheckoutStepState.COMPLETED,
        })
      } else {
        const shouldBeHidden = step.state === CheckoutStepState.HIDDEN
        if (shouldBeHidden) {
          newSteps.push(step)
          continue
        }

        if (step.state === CheckoutStepState.COMPLETED) {
          newSteps.push(step)
          continue
        }

        const hasCompletedStep = newSteps.find(
          s => s.state === CheckoutStepState.COMPLETED,
        )
        const hasUpcomingStep = newSteps.find(
          s => s.state === CheckoutStepState.UPCOMING,
        )

        if (hasCompletedStep && !hasUpcomingStep && !hasActivatedNext) {
          hasActivatedNext = true
          newSteps.push({
            ...step,
            state: CheckoutStepState.ACTIVE,
          })
        } else {
          newSteps.push(step)
        }
      }
    }

    state.savedCreditCard = savedCreditCard
    state.saveCreditCard = false
    state.confirmationToken = null
    state.steps = newSteps
  }),

  editFulfillmentDetails: action(state => {
    const newSteps: CheckoutStep[] = []

    for (const step of state.steps) {
      const isAfterFulfillmentDetailsStep = newSteps
        .map(s => s.name)
        .includes(CheckoutStepName.FULFILLMENT_DETAILS)

      if (
        isAfterFulfillmentDetailsStep &&
        step.state !== CheckoutStepState.HIDDEN
      ) {
        newSteps.push({
          ...step,
          state: CheckoutStepState.UPCOMING,
        })
      } else if (step.name === CheckoutStepName.FULFILLMENT_DETAILS) {
        newSteps.push({
          ...step,
          state: CheckoutStepState.ACTIVE,
        })
      } else {
        newSteps.push(step)
      }
    }

    state.steps = newSteps
  }),

  editDeliveryOption: action(state => {
    const newSteps: CheckoutStep[] = []

    for (const step of state.steps) {
      const isAfterDeliveryOptionsStep = newSteps
        .map(s => s.name)
        .includes(CheckoutStepName.DELIVERY_OPTION)

      if (
        isAfterDeliveryOptionsStep &&
        step.state !== CheckoutStepState.HIDDEN
      ) {
        newSteps.push({
          ...step,
          state: CheckoutStepState.UPCOMING,
        })
      } else if (step.name === CheckoutStepName.DELIVERY_OPTION) {
        newSteps.push({
          ...step,
          state: CheckoutStepState.ACTIVE,
        })
      } else {
        newSteps.push(step)
      }
    }

    state.steps = newSteps
  }),

  editPayment: action(state => {
    const newSteps: CheckoutStep[] = []

    for (const step of state.steps) {
      const isAfterPaymentStep = newSteps
        .map(s => s.name)
        .includes(CheckoutStepName.PAYMENT)

      if (isAfterPaymentStep && step.state !== CheckoutStepState.HIDDEN) {
        newSteps.push({
          ...step,
          state: CheckoutStepState.UPCOMING,
        })
      } else if (step.name === CheckoutStepName.PAYMENT) {
        newSteps.push({
          ...step,
          state: CheckoutStepState.ACTIVE,
        })
      } else {
        newSteps.push(step)
      }
    }

    state.steps = newSteps
  }),

  redirectToOrderDetails: action(state => {
    const orderID = state.orderData.internalID
    const orderDetailsURL = `/orders/${orderID}/details`
    state.router.replace(orderDetailsURL)
  }),
}))

interface Order2CheckoutContextProviderProps {
  order: Order2CheckoutContext_order$key
  children: React.ReactNode
}

export const Order2CheckoutContextProvider: React.FC<
  Order2CheckoutContextProviderProps
> = ({ order, children }) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const checkoutTracking = useCheckoutTracking(orderData)
  const partnerOffer = usePartnerOfferOnOrder(orderData)
  const { router } = useRouter()

  // Initialize the store with the initial state
  const initialState = useMemo(
    () => initialStateForOrder(orderData),
    [orderData],
  )

  const runtimeModel = {
    // Default values
    isLoading: true,
    expressCheckoutSubmitting: false,
    loadingError: null,
    expressCheckoutPaymentMethods: null,
    activeFulfillmentDetailsTab: null,
    confirmationToken: null,
    saveCreditCard: true,
    savedCreditCard: null,
    checkoutMode: "standard",
    steps: [],

    // Override with initialState values
    ...initialState,

    // Runtime dependencies
    checkoutTracking,
    router,
    orderData,
    partnerOffer,
  } as Order2CheckoutModel

  return (
    <Order2CheckoutContext.Provider runtimeModel={runtimeModel}>
      <CheckoutLoadingManager orderData={orderData} partnerOffer={partnerOffer}>
        {children}
      </CheckoutLoadingManager>
    </Order2CheckoutContext.Provider>
  )
}

const CheckoutLoadingManager: React.FC<{
  orderData: Order2CheckoutContext_order$data
  partnerOffer: {
    timer: ReturnType<typeof useCountdownTimer>
  } | null
  children: React.ReactNode
}> = ({ orderData, partnerOffer, children }) => {
  const [minimumLoadingPassed, setMinimumLoadingPassed] = useState(false)
  const [orderValidated, setOrderValidated] = useState(false)

  const isExpressCheckoutLoaded = Order2CheckoutContext.useStoreState(
    state => state.expressCheckoutPaymentMethods !== null,
  )
  const isLoading = Order2CheckoutContext.useStoreState(
    state => state.isLoading,
  )
  const setLoadingError = Order2CheckoutContext.useStoreActions(
    actions => actions.setLoadingError,
  )
  const setLoadingComplete = Order2CheckoutContext.useStoreActions(
    actions => actions.setLoadingComplete,
  )

  const isPartnerOfferLoadingComplete =
    !partnerOffer || !partnerOffer.timer.isLoading

  const checks = [
    minimumLoadingPassed,
    orderValidated,
    isExpressCheckoutLoaded,
    isPartnerOfferLoadingComplete,
  ]

  // Validate order and get into good initial checkout state on load
  // - artwork version match
  // - any resetting
  useEffect(() => {
    if (orderValidated || !orderData) {
      return
    }

    try {
      validateOrder(orderData)
      setOrderValidated(true)
    } catch (error) {
      logger.error("Error validating order: ", error.message)
      setLoadingError(error.message)
    }
  }, [orderData, orderValidated, setLoadingError])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMinimumLoadingPassed(true)
    }, MINIMUM_LOADING_MS)
    return () => clearTimeout(timeout)
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: one-time effect
  useEffect(() => {
    if (!isLoading) {
      return
    }

    if (checks.every(Boolean)) {
      setLoadingComplete()
    }
  }, [...checks])

  return <>{children}</>
}

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

  return hasPartnerOffer
    ? {
        timer: partnerOfferTimer,
      }
    : null
}

const initialStateForOrder = (
  order: Order2CheckoutContext_order$data,
): Partial<Order2CheckoutModel> => {
  const savedCheckoutMode = getStorageValue(
    CHECKOUT_MODE_STORAGE_KEY,
    "standard",
  )

  const stepNamesInOrder = [
    CheckoutStepName.FULFILLMENT_DETAILS,
    CheckoutStepName.DELIVERY_OPTION,
    CheckoutStepName.PAYMENT,
    CheckoutStepName.CONFIRMATION,
  ]

  if (order.mode === "OFFER") {
    stepNamesInOrder.unshift(CheckoutStepName.OFFER_AMOUNT)
  }

  // For now, always start from step one, and hide the delivery option
  // step immediately if the order is pickup
  // TODO: We should probably either reset the order to step one on load
  // or set the current step based on the order data at load time

  // Check if payment is already complete based on stripeConfirmationToken
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

    // If payment is already complete, mark payment step as completed
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
    checkoutMode: (savedCheckoutMode === "express"
      ? "express"
      : "standard") as CheckoutMode,
  }
}

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
