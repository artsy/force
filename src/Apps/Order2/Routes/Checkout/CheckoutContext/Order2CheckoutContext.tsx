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
import { applyDeliveryOptionLogic } from "Apps/Order2/Routes/Checkout/CheckoutContext/stepUtils"
import { useBuildInitialSteps } from "Apps/Order2/Routes/Checkout/Hooks/useBuildInitialSteps"
import { useCheckoutTracking } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutTracking"
import { useRouter } from "System/Hooks/useRouter"
import createLogger from "Utils/logger"
import type {
  Order2CheckoutContext_order$data,
  Order2CheckoutContext_order$key,
} from "__generated__/Order2CheckoutContext_order.graphql"
import type { Order2CheckoutContext_me$key } from "__generated__/Order2CheckoutContext_me.graphql"
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
  hasSavedAddresses: boolean
  isLoading: boolean
  isFulfillmentDetailsSaving: boolean
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
  setExpressCheckoutLoaded: Action<this, ExpressCheckoutPaymentMethod[]>
  setExpressCheckoutState: Action<this, "submit" | "active" | null>
  /**
   * Marks the given step COMPLETED and activates the next non-HIDDEN step.
   * Logs an error if the named step is not currently ACTIVE.
   * Use this when a component finishes its work and is ready to move forward.
   */
  completeStep: Action<this, CheckoutStepName>
  /**
   * Marks the given step ACTIVE and resets all following visible steps to UPCOMING.
   * Steps before it are unchanged. HIDDEN steps are skipped.
   * Use this when a user clicks Edit on a completed step.
   */
  editStep: Action<this, CheckoutStepName>
  setActiveFulfillmentDetailsTab: Action<this, FulfillmentDetailsTab | null>
  setLoadingComplete: Action<this>
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
  setIsFulfillmentDetailsSaving: Action<this, boolean>
  /** True once any eager pre-load address auto-save has completed (or is not needed). */
  isInitialAutoSaveComplete: boolean
  setInitialAutoSaveComplete: Action<this>
}

export const Order2CheckoutContext: ReturnType<
  typeof createContextStore<Order2CheckoutModel>
> = createContextStore<Order2CheckoutModel>(initialState => ({
  // Initial state with defaults
  hasSavedAddresses: false,
  isLoading: true,
  isFulfillmentDetailsSaving: false,
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
  isInitialAutoSaveComplete: true,

  // Required runtime props - will be provided by Provider
  // These will be overridden by the Provider with actual values
  checkoutTracking: null as any,
  router: null as any,
  orderData: null as any,

  // Override with initialState values if provided
  ...initialState,

  // Actions
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

      // Update delivery option step visibility based on pickup selection
      state.steps = applyDeliveryOptionLogic(
        state.steps as CheckoutStep[],
        activeFulfillmentDetailsTab,
      )
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

  completeStep: action((state, targetName) => {
    const targetIndex = state.steps.findIndex(s => s.name === targetName)
    if (targetIndex === -1) {
      logger.error(`completeStep: step "${targetName}" not found`)
      return
    }
    if (state.steps[targetIndex].state !== CheckoutStepState.ACTIVE) {
      logger.error(
        `completeStep: step "${targetName}" is not ACTIVE (state: ${state.steps[targetIndex].state})`,
      )
    }
    let activatedNext = false
    state.steps = state.steps.map((step, i) => {
      if (step.state === CheckoutStepState.HIDDEN) return step
      // In dual-active scenarios, also complete any preceding ACTIVE steps
      if (i < targetIndex && step.state === CheckoutStepState.ACTIVE)
        return { ...step, state: CheckoutStepState.COMPLETED }
      if (i === targetIndex)
        return { ...step, state: CheckoutStepState.COMPLETED }
      if (
        !activatedNext &&
        i > targetIndex &&
        step.state === CheckoutStepState.UPCOMING
      ) {
        activatedNext = true
        return { ...step, state: CheckoutStepState.ACTIVE }
      }
      return step
    })
    state.steps = applyDeliveryOptionLogic(state.steps as CheckoutStep[])
  }),

  setConfirmationToken: action((state, { confirmationToken }) => {
    state.confirmationToken = confirmationToken
  }),

  setSavePaymentMethod: action((state, savePaymentMethod) => {
    state.savePaymentMethod = savePaymentMethod
  }),

  editStep: action((state, targetName) => {
    const targetIndex = state.steps.findIndex(s => s.name === targetName)
    if (targetIndex === -1) {
      logger.error(`editStep: step "${targetName}" not found`)
      return
    }
    state.steps = state.steps.map((step, i) => {
      if (step.state === CheckoutStepState.HIDDEN) return step
      if (i === targetIndex) return { ...step, state: CheckoutStepState.ACTIVE }
      if (i > targetIndex) return { ...step, state: CheckoutStepState.UPCOMING }
      return step
    })
    state.steps = applyDeliveryOptionLogic(state.steps as CheckoutStep[])
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

  setIsFulfillmentDetailsSaving: action((state, isFulfillmentDetailsSaving) => {
    state.isFulfillmentDetailsSaving = isFulfillmentDetailsSaving
  }),

  setInitialAutoSaveComplete: action(state => {
    state.isInitialAutoSaveComplete = true
  }),
}))

interface Order2CheckoutContextProviderProps {
  order: Order2CheckoutContext_order$key
  me: Order2CheckoutContext_me$key
  children: React.ReactNode
}

export const Order2CheckoutContextProvider: React.FC<
  Order2CheckoutContextProviderProps
> = ({ order, me, children }) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const meData = useFragment(ME_FRAGMENT, me)
  const checkoutTracking = useCheckoutTracking(orderData)
  const { router } = useRouter()

  const hasSavedAddresses = (meData.addressConnection?.edges?.length ?? 0) > 0

  const initialSteps = useBuildInitialSteps(orderData)

  // Auto-save is needed when: non-offer, has saved addresses, FD not yet complete,
  // and FD is the first active step (no offer step before it).
  const fulfillmentDetailsStep = initialSteps.find(
    s => s.name === CheckoutStepName.FULFILLMENT_DETAILS,
  )
  const isOffer = orderData.mode === "OFFER"
  const needsInitialAutoSave =
    !isOffer &&
    hasSavedAddresses &&
    fulfillmentDetailsStep?.state === CheckoutStepState.ACTIVE

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
    hasSavedAddresses,
    isInitialAutoSaveComplete: !needsInitialAutoSave,
  } as Order2CheckoutModel

  return (
    <Order2CheckoutContext.Provider runtimeModel={runtimeModel}>
      {children}
    </Order2CheckoutContext.Provider>
  )
}

const ME_FRAGMENT = graphql`
  fragment Order2CheckoutContext_me on Me {
    addressConnection(first: 20) {
      edges {
        node {
          internalID
        }
      }
    }
  }
`

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
