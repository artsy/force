import type {
  CheckoutSection,
  CheckoutStep,
  ExpressCheckoutPaymentMethod,
  FulfillmentDetailsTab,
  UserAddressMode,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import type { CheckoutErrorBannerMessage } from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { useBuildInitialSteps } from "Apps/Order2/Routes/Checkout/Hooks/useBuildInitialSteps"
import { useCheckoutTracking } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutTracking"
import { useRouter } from "System/Hooks/useRouter"
import createLogger from "Utils/logger"
import type {
  Order2CheckoutContext_order$data,
  Order2CheckoutContext_order$key,
} from "__generated__/Order2CheckoutContext_order.graphql"
import { type Action, action, createContextStore } from "easy-peasy"
import type React from "react"
import { useMemo } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2CheckoutContext.tsx")
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
    | {
        readonly __typename: "%other"
      }
    | null
    | undefined
} | null

type Messages = Partial<
  Record<CheckoutSection, { error: CheckoutErrorBannerMessage | null }>
>

export interface Order2CheckoutModel {
  // State
  isLoading: boolean
  /** True while the address mutation is in-flight; used by DELIVERY_OPTION step to show skeleton */
  isAddressLoading: boolean
  /** Express checkout loading state: 'submit' when submitting payment, 'active' when waiting for user to complete payment, null when idle */
  expressCheckoutState: "submit" | "active" | null
  expressCheckoutPaymentMethods: ExpressCheckoutPaymentMethod[] | null
  steps: CheckoutStep[]
  activeFulfillmentDetailsTab: FulfillmentDetailsTab | null
  confirmationToken: ConfirmationTokenState
  savePaymentMethod: boolean
  checkoutMode: CheckoutMode
  userAddressMode: UserAddressMode | null
  messages: Messages
  artworkPath: string

  // External data - passed in as runtime props
  checkoutTracking: ReturnType<typeof useCheckoutTracking>
  router: ReturnType<typeof useRouter>["router"]
  orderData: Order2CheckoutContext_order$data

  // Actions
  setAddressLoading: Action<this, boolean>
  setExpressCheckoutLoaded: Action<this, ExpressCheckoutPaymentMethod[]>
  setExpressCheckoutState: Action<this, "submit" | "active" | null>
  setFulfillmentDetailsComplete: Action<
    this,
    { isPickup?: boolean; isFlatShipping?: boolean }
  >
  setActiveFulfillmentDetailsTab: Action<this, FulfillmentDetailsTab | null>
  editFulfillmentDetails: Action<this>
  setDeliveryOptionComplete: Action<this>
  editDeliveryOption: Action<this>
  editPayment: Action<this>
  setOfferAmountComplete: Action<this>
  editOfferAmount: Action<this>
  setLoadingComplete: Action<this>
  setPaymentComplete: Action<this>
  setConfirmationToken: Action<
    this,
    { confirmationToken: ConfirmationTokenState }
  >
  setSavePaymentMethod: Action<this, boolean>
  redirectToOrderDetails: Action<this>
  setCheckoutMode: Action<this, CheckoutMode>
  setUserAddressMode: Action<this, UserAddressMode | null>
  setSectionErrorMessage: Action<
    this,
    {
      section: CheckoutSection
      error: CheckoutErrorBannerMessage | null | undefined
    }
  >
}

export const Order2CheckoutContext: ReturnType<
  typeof createContextStore<Order2CheckoutModel>
> = createContextStore<Order2CheckoutModel>(initialState => ({
  // Initial state with defaults
  isLoading: true,
  isAddressLoading: false,
  expressCheckoutState: null,
  expressCheckoutPaymentMethods: null,
  activeFulfillmentDetailsTab: null,
  confirmationToken: null,
  savePaymentMethod: true,
  checkoutMode: "standard",
  steps: [],
  userAddressMode: null,
  messages: {},
  artworkPath: "/",

  // Required runtime props - will be provided by Provider
  // These will be overridden by the Provider with actual values
  checkoutTracking: null as any,
  router: null as any,
  orderData: null as any,

  // Override with initialState values if provided
  ...initialState,

  // Actions
  setAddressLoading: action((state, isAddressLoading) => {
    state.isAddressLoading = isAddressLoading
  }),

  setExpressCheckoutLoaded: action((state, availablePaymentMethods) => {
    if (state.isLoading && state.expressCheckoutPaymentMethods === null) {
      state.expressCheckoutPaymentMethods = availablePaymentMethods
    }
  }),

  setExpressCheckoutState: action((state, isSubmitting) => {
    state.expressCheckoutState = isSubmitting
  }),

  setActiveFulfillmentDetailsTab: action(
    (state, activeFulfillmentDetailsTab) => {
      state.activeFulfillmentDetailsTab = activeFulfillmentDetailsTab
      state.steps = state.steps.map(step => {
        if (step.name !== CheckoutStepName.DELIVERY_OPTION) return step
        if (activeFulfillmentDetailsTab === "PICKUP")
          return { ...step, state: CheckoutStepState.HIDDEN }
        if (step.state === CheckoutStepState.HIDDEN)
          return { ...step, state: CheckoutStepState.ACTIVE }
        return step
      })
    },
  ),

  setLoadingComplete: action(state => {
    state.isLoading = false
  }),

  setCheckoutMode: action((state, mode) => {
    setStorageValue(CHECKOUT_MODE_STORAGE_KEY, mode)
    state.checkoutMode = mode
  }),

  setUserAddressMode: action((state, userAddressMode) => {
    state.userAddressMode = userAddressMode
  }),

  setFulfillmentDetailsComplete: action((state, args) => {
    const isPickup = args?.isPickup ?? false

    const fulfillmentStep = state.steps.find(
      s => s.name === CheckoutStepName.FULFILLMENT_DETAILS,
    )
    if (fulfillmentStep?.state === CheckoutStepState.COMPLETED) {
      return // already completed, no-op
    }
    if (fulfillmentStep?.state !== CheckoutStepState.ACTIVE) {
      logger.error(
        `setFulfillmentDetailsComplete called when FULFILLMENT_DETAILS is not ACTIVE (state: ${fulfillmentStep?.state})`,
      )
      return
    }

    const deliveryOptionAlreadyResolved = state.steps.some(
      s =>
        s.name === CheckoutStepName.DELIVERY_OPTION &&
        (s.state === CheckoutStepState.COMPLETED ||
          s.state === CheckoutStepState.HIDDEN),
    )

    state.steps = state.steps.map(step => {
      if (step.name === CheckoutStepName.FULFILLMENT_DETAILS)
        return { ...step, state: CheckoutStepState.COMPLETED }
      if (step.name === CheckoutStepName.DELIVERY_OPTION && isPickup)
        return { ...step, state: CheckoutStepState.HIDDEN }
      if (
        step.name === CheckoutStepName.PAYMENT &&
        (isPickup || deliveryOptionAlreadyResolved)
      )
        return { ...step, state: CheckoutStepState.ACTIVE }
      return step
    })
  }),

  setDeliveryOptionComplete: action(state => {
    const deliveryStep = state.steps.find(
      s => s.name === CheckoutStepName.DELIVERY_OPTION,
    )
    if (deliveryStep?.state !== CheckoutStepState.ACTIVE) {
      logger.error(
        `setDeliveryOptionComplete called when DELIVERY_OPTION is not ACTIVE (state: ${deliveryStep?.state})`,
      )
      return
    }

    state.steps = state.steps.map(step => {
      // Complete FULFILLMENT_DETAILS if still ACTIVE (saved-addresses path: both steps run simultaneously)
      if (
        step.name === CheckoutStepName.FULFILLMENT_DETAILS &&
        step.state === CheckoutStepState.ACTIVE
      )
        return { ...step, state: CheckoutStepState.COMPLETED }
      if (step.name === CheckoutStepName.DELIVERY_OPTION)
        return { ...step, state: CheckoutStepState.COMPLETED }
      if (step.name === CheckoutStepName.PAYMENT)
        return { ...step, state: CheckoutStepState.ACTIVE }
      return step
    })
  }),

  setPaymentComplete: action((state: Order2CheckoutModel) => {
    state.steps = state.steps.map(step => {
      if (step.name === CheckoutStepName.PAYMENT)
        return { ...step, state: CheckoutStepState.COMPLETED }
      if (step.name === CheckoutStepName.CONFIRMATION)
        return { ...step, state: CheckoutStepState.ACTIVE }
      return step
    })
  }),

  setConfirmationToken: action((state, { confirmationToken }) => {
    state.confirmationToken = confirmationToken
  }),

  setSavePaymentMethod: action((state, savePaymentMethod) => {
    state.savePaymentMethod = savePaymentMethod
  }),

  editFulfillmentDetails: action(state => {
    // Re-activates both FULFILLMENT_DETAILS and DELIVERY_OPTION (they work simultaneously).
    state.steps = state.steps.map(step => {
      if (step.name === CheckoutStepName.FULFILLMENT_DETAILS)
        return { ...step, state: CheckoutStepState.ACTIVE }
      if (step.name === CheckoutStepName.DELIVERY_OPTION)
        return {
          ...step,
          state:
            step.state === CheckoutStepState.HIDDEN
              ? CheckoutStepState.HIDDEN
              : CheckoutStepState.ACTIVE,
        }
      if (
        step.name === CheckoutStepName.PAYMENT ||
        step.name === CheckoutStepName.CONFIRMATION
      )
        return { ...step, state: CheckoutStepState.UPCOMING }
      return step
    })
  }),

  editDeliveryOption: action(state => {
    // Re-activates DELIVERY_OPTION; FULFILLMENT_DETAILS stays completed.
    state.steps = state.steps.map(step => {
      if (step.name === CheckoutStepName.DELIVERY_OPTION)
        return { ...step, state: CheckoutStepState.ACTIVE }
      if (
        step.name === CheckoutStepName.PAYMENT ||
        step.name === CheckoutStepName.CONFIRMATION
      )
        return { ...step, state: CheckoutStepState.UPCOMING }
      return step
    })
  }),

  editPayment: action(state => {
    state.steps = state.steps.map(step => {
      if (step.name === CheckoutStepName.PAYMENT)
        return { ...step, state: CheckoutStepState.ACTIVE }
      if (step.name === CheckoutStepName.CONFIRMATION)
        return { ...step, state: CheckoutStepState.UPCOMING }
      return step
    })
  }),

  setOfferAmountComplete: action(state => {
    const offerStep = state.steps.find(
      s => s.name === CheckoutStepName.OFFER_AMOUNT,
    )
    if (offerStep?.state !== CheckoutStepState.ACTIVE) {
      logger.error(
        `setOfferAmountComplete called when OFFER_AMOUNT is not ACTIVE (state: ${offerStep?.state})`,
      )
      return
    }

    state.steps = state.steps.map(step => {
      if (step.name === CheckoutStepName.OFFER_AMOUNT)
        return { ...step, state: CheckoutStepState.COMPLETED }
      // FULFILLMENT_DETAILS and DELIVERY_OPTION are worked on simultaneously
      if (step.name === CheckoutStepName.FULFILLMENT_DETAILS)
        return { ...step, state: CheckoutStepState.ACTIVE }
      if (
        step.name === CheckoutStepName.DELIVERY_OPTION &&
        step.state === CheckoutStepState.UPCOMING
      )
        return { ...step, state: CheckoutStepState.ACTIVE }
      return step
    })
  }),

  editOfferAmount: action(state => {
    state.steps = state.steps.map(step => {
      if (step.name === CheckoutStepName.OFFER_AMOUNT)
        return { ...step, state: CheckoutStepState.ACTIVE }
      if (
        step.name === CheckoutStepName.FULFILLMENT_DETAILS ||
        step.name === CheckoutStepName.DELIVERY_OPTION ||
        step.name === CheckoutStepName.PAYMENT ||
        step.name === CheckoutStepName.CONFIRMATION
      )
        return { ...step, state: CheckoutStepState.UPCOMING }
      return step
    })
  }),

  redirectToOrderDetails: action(state => {
    const orderID = state.orderData.internalID
    const orderDetailsURL = `/orders/${orderID}/details`
    state.router.replace(orderDetailsURL)
  }),

  setSectionErrorMessage: action((state, { section, error }) => {
    state.messages = {
      ...state.messages,
      [section]: { error },
    }
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
  const { router } = useRouter()

  // Build initial steps using the hook
  const initialSteps = useBuildInitialSteps(orderData)

  // Initialize the store with the initial state
  const initialState = useMemo(
    () => initialStateForOrder(orderData, initialSteps),
    [orderData, initialSteps],
  )

  // Calculate artworkPath from orderData
  const artworkPath = useMemo(() => {
    const artworkSlug = orderData.lineItems?.[0]?.artwork?.slug
    return artworkSlug ? `/artwork/${artworkSlug}` : "/"
  }, [orderData])

  const runtimeModel = {
    // Default values
    isLoading: true,
    isAddressLoading: false,
    expressCheckoutState: null,
    expressCheckoutPaymentMethods: null,
    activeFulfillmentDetailsTab: null,
    confirmationToken: null,
    savePaymentMethod: true,
    savedPaymentMethod: null,
    checkoutMode: "standard",
    steps: [],
    messages: {},

    // Override with initialState values
    ...initialState,

    // Runtime dependencies
    checkoutTracking,
    router,
    orderData,
    artworkPath,
  } as Order2CheckoutModel

  return (
    <Order2CheckoutContext.Provider runtimeModel={runtimeModel}>
      {children}
    </Order2CheckoutContext.Provider>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment Order2CheckoutContext_order on Order {
    ...useBuildInitialSteps_order
    internalID
    mode
    source
    stripeConfirmationToken
    selectedFulfillmentOption {
      type
    }
    lineItems {
      artwork {
        slug
      }
    }
  }
`

const initialStateForOrder = (
  order: Order2CheckoutContext_order$data,
  steps: CheckoutStep[],
): Partial<Order2CheckoutModel> => {
  const savedCheckoutMode = getStorageValue(
    CHECKOUT_MODE_STORAGE_KEY,
    "standard",
  )

  // Check if fulfillment details step is complete
  const fulfillmentDetailsStep = steps.find(
    step => step.name === CheckoutStepName.FULFILLMENT_DETAILS,
  )
  const fulfillmentComplete =
    fulfillmentDetailsStep?.state === CheckoutStepState.COMPLETED

  const isPickup = order.selectedFulfillmentOption?.type === "PICKUP"
  const activeFulfillmentDetailsTab = isPickup ? "PICKUP" : "DELIVERY"

  return {
    isLoading: true,
    expressCheckoutState: null,
    expressCheckoutPaymentMethods: null,
    activeFulfillmentDetailsTab: fulfillmentComplete
      ? (activeFulfillmentDetailsTab as FulfillmentDetailsTab)
      : null,
    confirmationToken: order.stripeConfirmationToken
      ? { id: order.stripeConfirmationToken }
      : null,
    savePaymentMethod: true,
    steps,
    checkoutMode: (savedCheckoutMode === "express"
      ? "express"
      : "standard") as CheckoutMode,
    messages: {},
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
