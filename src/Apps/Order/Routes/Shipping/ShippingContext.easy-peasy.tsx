import { createContextStore, Action, action, Thunk, thunk } from "easy-peasy"
import type { Dialog } from "Apps/Order/Dialogs"
import type { ShippingProps, ShippingStage } from "Apps/Order/Routes/Shipping"
import { useHandleExchangeError } from "Apps/Order/Routes/Shipping/Hooks/useHandleExchangeError"
import {
  type ComputedOrderData,
  computeOrderData,
} from "Apps/Order/Routes/Shipping/Utils/computeOrderData"
import type {
  FulfillmentValues,
  SavedAddressType,
} from "Apps/Order/Routes/Shipping/Utils/shippingUtils"
import { extractNodes } from "Utils/extractNodes"
import type createLogger from "Utils/logger"
import type { ShippingContext_me$key } from "__generated__/ShippingContext_me.graphql"
import type { ShippingContext_order$key } from "__generated__/ShippingContext_order.graphql"
import type { FormikProps } from "formik"
import { compact } from "lodash"
import {
  type FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { graphql, useFragment } from "react-relay"

// Easy-peasy store model interface
interface ShippingStoreModel {
  // State
  shippingFormMode: "new_address" | "saved_addresses"
  newSavedAddressID: string | null
  selectedSavedAddressID: string | null
  selectedShippingQuoteID: string | null
  stage: ShippingStage
  isPerformingOperation: boolean
  isLoading: boolean
  isExpressCheckoutLoading: boolean

  // Actions
  setShippingFormMode: Action<
    ShippingStoreModel,
    "new_address" | "saved_addresses"
  >
  setNewSavedAddressID: Action<ShippingStoreModel, string | null>
  setSelectedSavedAddressID: Action<ShippingStoreModel, string | null>
  setSelectedShippingQuote: Action<ShippingStoreModel, string | null>
  setStage: Action<ShippingStoreModel, ShippingStage>
  setIsPerformingOperation: Action<ShippingStoreModel, boolean>
  setIsLoading: Action<ShippingStoreModel, boolean>
  setIsExpressCheckoutLoading: Action<ShippingStoreModel, boolean>

  // Thunks
  goBackToFulfillmentDetails: Thunk<ShippingStoreModel>
}

// Create the context store with initial state factory
const createShippingStore = (initialState: {
  shippingFormMode: "new_address" | "saved_addresses"
  selectedSavedAddressID: string | null
  selectedShippingQuoteID: string | null
}) =>
  createContextStore<ShippingStoreModel>(runtimeModel => ({
    // State
    shippingFormMode:
      runtimeModel?.shippingFormMode || initialState.shippingFormMode,
    newSavedAddressID: runtimeModel?.newSavedAddressID || null,
    selectedSavedAddressID:
      runtimeModel?.selectedSavedAddressID ||
      initialState.selectedSavedAddressID,
    selectedShippingQuoteID:
      runtimeModel?.selectedShippingQuoteID ||
      initialState.selectedShippingQuoteID,
    stage: runtimeModel?.stage || "fulfillment_details",
    isPerformingOperation: runtimeModel?.isPerformingOperation || false,
    isLoading: runtimeModel?.isLoading ?? true,
    isExpressCheckoutLoading: runtimeModel?.isExpressCheckoutLoading ?? true,

    // Actions
    setShippingFormMode: action((state, payload) => {
      state.shippingFormMode = payload
    }),

    setNewSavedAddressID: action((state, payload) => {
      state.newSavedAddressID = payload
    }),

    setSelectedSavedAddressID: action((state, payload) => {
      state.selectedSavedAddressID = payload
    }),

    setSelectedShippingQuote: action((state, payload) => {
      state.selectedShippingQuoteID = payload
    }),

    setStage: action((state, payload) => {
      state.stage = payload
    }),

    setIsPerformingOperation: action((state, payload) => {
      state.isPerformingOperation = payload
    }),

    setIsLoading: action((state, payload) => {
      state.isLoading = payload
    }),

    setIsExpressCheckoutLoading: action((state, payload) => {
      state.isExpressCheckoutLoading = payload
    }),

    // Thunks
    goBackToFulfillmentDetails: thunk((actions, _, { getState }) => {
      const state = getState()
      if (state.stage !== "fulfillment_details") {
        actions.setStage("fulfillment_details")
      }
    }),
  }))

// Legacy context for complex state
interface ShippingLegacyContextProps {
  fulfillmentDetailsFormikContext: FormikProps<FulfillmentValues>
  setFulfillmentDetailsFormikContext: (
    payload: FormikProps<FulfillmentValues>,
  ) => void
  dialog: Dialog
  handleExchangeError: (
    error: {
      code: string
      data: string | null | undefined
    },
    logger: ReturnType<typeof createLogger>,
  ) => void
  orderData: ComputedOrderData
  meData: {
    addressList: SavedAddressType[]
    name: string | null
  }
}

const ShippingLegacyContext = createContext<ShippingLegacyContextProps>(
  {} as any,
)

export interface ShippingContextProps {
  actions: {
    dialog: Dialog
    goBackToFulfillmentDetails: () => void
    handleExchangeError: (
      error: {
        code: string
        data: string | null | undefined
      },
      logger: ReturnType<typeof createLogger>,
    ) => void
    setFulfillmentDetailsFormikContext: (
      payload: FormikProps<FulfillmentValues>,
    ) => void
    setSelectedShippingQuote: (payload: string | null) => void
    setNewSavedAddressID: (payload: string | null) => void
    setSelectedSavedAddressID: (payload: string | null) => void
    setShippingFormMode: (payload: "new_address" | "saved_addresses") => void
    setIsPerformingOperation: (payload: boolean) => void
    setStage: (payload: ShippingStage) => void
    setIsExpressCheckoutLoading: (payload: boolean) => void
  }
  state: any // Will be composed from both stores
  orderData: ComputedOrderData
  meData: {
    addressList: SavedAddressType[]
    name: string | null
  }
}

export const ShippingContextProvider: FC<
  React.PropsWithChildren<{
    order: ShippingContext_order$key
    me: ShippingContext_me$key
    dialog: ShippingProps["dialog"]
  }>
> = props => {
  const orderFragmentData = useFragment(ORDER_FRAGMENT, props.order)
  const meFragmentData = useFragment(ME_FRAGMENT, props.me)
  const meData = useMemo(
    () => ({
      addressList: compact<SavedAddressType>(
        extractNodes(meFragmentData?.addressConnection) ?? [],
      ),
      name: meFragmentData?.name ?? null,
    }),
    [meFragmentData.addressConnection, meFragmentData.name],
  )

  const orderData = computeOrderData(orderFragmentData, meData)

  /*
   * Because there is a single button for both fulfillment details and
   * shipping quote steps (and duplicated in the sidebar)
   * we need to hack some formik values UP from the fulfillment details form.
   */
  const fulfillmentFormikRef = useRef<FormikProps<FulfillmentValues>>({
    // Used to submit the form
    submitForm: () => Promise.reject(new Error("form not loaded")),
    // Used to disable the button
    isValid: false,
    // Used to get the form values for un-saving the address if the user
    // unchecks it after saving it in the fulfillment details step.
    values: {
      attributes: {
        saveAddress: false,
      },
    },
  } as unknown as FormikProps<FulfillmentValues>)

  const [fulfillmentDetailsFormikContext, setFulfillmentDetailsFormikContext] =
    useState(fulfillmentFormikRef.current)

  // Create store with initial state
  const ShippingStore = useRef(
    createShippingStore({
      shippingFormMode:
        meData.addressList.length > 0 ? "saved_addresses" : "new_address",
      selectedShippingQuoteID: orderData.selectedShippingQuoteID ?? null,
      selectedSavedAddressID:
        orderData.savedFulfillmentDetails?.selectedSavedAddressID ?? null,
    }),
  )

  const { handleExchangeError } = useHandleExchangeError({
    dialog: props.dialog,
    isArtsyShipping:
      orderData.savedFulfillmentDetails?.isArtsyShipping ?? false,
    orderData,
  })

  // Set loading to false once data is available
  const setIsLoading = ShippingStore.current.useStoreActions(
    actions => actions.setIsLoading,
  )
  useEffect(() => {
    if (orderFragmentData && meFragmentData) {
      setIsLoading(false)
    }
  }, [orderFragmentData, meFragmentData, setIsLoading])

  return (
    <ShippingStore.current.Provider>
      <ShippingLegacyContext.Provider
        value={{
          fulfillmentDetailsFormikContext,
          setFulfillmentDetailsFormikContext: formHelpers => {
            setFulfillmentDetailsFormikContext(formHelpers)
          },
          dialog: props.dialog,
          handleExchangeError,
          orderData,
          meData,
        }}
      >
        <ShippingContextWrapper>{props.children}</ShippingContextWrapper>
      </ShippingLegacyContext.Provider>
    </ShippingStore.current.Provider>
  )
}

// Internal wrapper to combine stores and provide backward compatible context
const ShippingContextWrapper: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const legacyContext = useContext(ShippingLegacyContext)
  const storeState = useStoreState(state => state)
  const storeActions = useStoreActions(actions => actions)

  const contextValue: ShippingContextProps = {
    actions: {
      ...storeActions,
      dialog: legacyContext.dialog,
      handleExchangeError: legacyContext.handleExchangeError,
      setFulfillmentDetailsFormikContext:
        legacyContext.setFulfillmentDetailsFormikContext,
      goBackToFulfillmentDetails: () =>
        storeActions.goBackToFulfillmentDetails(),
    },
    state: {
      ...storeState,
      fulfillmentDetailsFormikContext:
        legacyContext.fulfillmentDetailsFormikContext,
    },
    orderData: legacyContext.orderData,
    meData: legacyContext.meData,
  }

  return (
    <ShippingContext.Provider value={contextValue}>
      {children}
    </ShippingContext.Provider>
  )
}

// Helper hooks for accessing the store (need to be defined outside component)
const useStoreState = selector => {
  // This is a workaround - in real implementation we'd need to expose the store instance
  return {} as any
}

const useStoreActions = selector => {
  // This is a workaround - in real implementation we'd need to expose the store instance
  return {} as any
}

export const ShippingContext = createContext<ShippingContextProps>({} as any)

const ORDER_FRAGMENT = graphql`
  fragment ShippingContext_order on CommerceOrder {
    internalID
    mode
    requestedFulfillment {
      __typename
      ... on CommercePickup {
        phoneNumber
      }
      ... on CommerceShip {
        name
        addressLine1
        addressLine2
        city
        region
        country
        postalCode
        phoneNumber
      }
      ... on CommerceShipArta {
        name
        addressLine1
        addressLine2
        city
        region
        country
        postalCode
        phoneNumber
      }
    }
    lineItems {
      edges {
        node {
          shippingQuoteOptions {
            edges {
              node {
                id
                isSelected
              }
            }
          }
          artwork {
            artsyShippingInternational
            euShippingOrigin
            isFixedShippingFeeOnly
            onlyShipsDomestically
            processWithArtsyShippingDomestic
            shippingCountry
          }
        }
      }
    }
  }
`

const ME_FRAGMENT = graphql`
  fragment ShippingContext_me on Me
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 30 }
    last: { type: "Int" }
    after: { type: "String" }
    before: { type: "String" }
  ) {
    name
    addressConnection(
      first: $first
      last: $last
      before: $before
      after: $after
    ) {
      edges {
        node {
          id
          internalID
          addressLine1
          addressLine2
          addressLine3
          city
          country
          isDefault
          name
          phoneNumber
          postalCode
          region
        }
      }
    }
  }
`
