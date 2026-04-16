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
  /**
   * True while the address mutation is in flight from a saved address radio selection.
   * TODO: Consider broadening this to cover the subsequent option auto-save as well,
   * keeping the entire delivery section in a loading state throughout the address→option sequence.
   */
  isSavedAddressSelectionMutating: boolean
  hasSavedAddresses: boolean

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
  /**
   * Like editStep(FULFILLMENT_DETAILS) but keeps DELIVERY_OPTION ACTIVE
   * (not UPCOMING) when it was already active or completed, so the skeleton
   * shows during address mutations and the auto-save effect works correctly.
   */
  editFulfillmentDetails: Action<this>
  setSavedAddressSelectionMutating: Action<this, boolean>
}

export const Order2CheckoutContext: ReturnType<
  typeof createContextStore<Order2CheckoutModel>
> = createContextStore<Order2CheckoutModel>(initialState => ({
  // Initial state with defaults
  isLoading: true,
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
  isSavedAddressSelectionMutating: false,
  hasSavedAddresses: false,

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
              state: state.hasSavedAddresses
                ? CheckoutStepState.ACTIVE
                : CheckoutStepState.UPCOMING,
            }
          }
        }
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
    // Don't activate a new step if one after the target is already ACTIVE
    // (e.g. re-submitting fulfillment details while delivery options is
    // still open from a prior visit to that step).
    const hasActiveStepAfterTarget = state.steps.some(
      (step, i) => i > targetIndex && step.state === CheckoutStepState.ACTIVE,
    )
    let activatedNext = false
    state.steps = state.steps.map((step, i) => {
      if (step.state === CheckoutStepState.HIDDEN) return step
      // Also complete any preceding steps still ACTIVE (e.g. when
      // DELIVERY_OPTION completes while FULFILLMENT_DETAILS is still ACTIVE
      // in the saved-address fast-checkout flow).
      if (i < targetIndex && step.state === CheckoutStepState.ACTIVE) {
        return { ...step, state: CheckoutStepState.COMPLETED }
      }
      if (i === targetIndex) {
        return { ...step, state: CheckoutStepState.COMPLETED }
      }
      if (
        !hasActiveStepAfterTarget &&
        !activatedNext &&
        step.state === CheckoutStepState.UPCOMING
      ) {
        activatedNext = true
        return { ...step, state: CheckoutStepState.ACTIVE }
      }
      return step
    })
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
  }),

  setConfirmationToken: action((state, { confirmationToken }) => {
    state.confirmationToken = confirmationToken
  }),

  setSavePaymentMethod: action((state, savePaymentMethod) => {
    state.savePaymentMethod = savePaymentMethod
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

  setSavedAddressSelectionMutating: action((state, value) => {
    state.isSavedAddressSelectionMutating = value
  }),

  editFulfillmentDetails: action(state => {
    const targetIndex = state.steps.findIndex(
      s => s.name === CheckoutStepName.FULFILLMENT_DETAILS,
    )
    if (targetIndex === -1) {
      logger.error("editFulfillmentDetails: FULFILLMENT_DETAILS step not found")
      return
    }
    state.steps = state.steps.map((step, i) => {
      if (step.state === CheckoutStepState.HIDDEN) return step
      if (i === targetIndex) return { ...step, state: CheckoutStepState.ACTIVE }
      if (i > targetIndex) {
        if (
          step.name === CheckoutStepName.DELIVERY_OPTION &&
          state.hasSavedAddresses
        ) {
          return { ...step, state: CheckoutStepState.ACTIVE }
        }
        return { ...step, state: CheckoutStepState.UPCOMING }
      }
      return step
    })
  }),
}))

interface Order2CheckoutContextProviderProps {
  order: Order2CheckoutContext_order$key
  hasSavedAddresses: boolean
  children: React.ReactNode
}

export const Order2CheckoutContextProvider: React.FC<
  Order2CheckoutContextProviderProps
> = ({ order, hasSavedAddresses, children }) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const checkoutTracking = useCheckoutTracking(orderData)
  const { router } = useRouter()

  // Build initial steps using the hook, then promote DELIVERY_OPTION to ACTIVE
  // alongside FULFILLMENT_DETAILS when saved addresses are present.
  const builtSteps = useBuildInitialSteps(orderData)
  const initialSteps = useMemo(() => {
    if (!hasSavedAddresses) return builtSteps
    return builtSteps.map(step =>
      step.name === CheckoutStepName.DELIVERY_OPTION &&
      step.state === CheckoutStepState.UPCOMING
        ? { ...step, state: CheckoutStepState.ACTIVE }
        : step,
    )
  }, [builtSteps, hasSavedAddresses])

  // Initialize the store with the initial state
  const initialState = useMemo(
    () => initialStateForOrder(orderData, initialSteps, hasSavedAddresses),
    [orderData, initialSteps, hasSavedAddresses],
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
  hasSavedAddresses: boolean,
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
    hasSavedAddresses,
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
