import React, { createContext, FC, useMemo, useReducer, useRef } from "react"
import {
  ComputedOrderData,
  computeOrderData,
} from "Apps/Order/Routes/Shipping2/Utils/computeOrderData"
import { ShippingContext_order$key } from "__generated__/ShippingContext_order.graphql"
import { ShippingContext_me$key } from "__generated__/ShippingContext_me.graphql"
import { compact } from "lodash"
import { extractNodes } from "Utils/extractNodes"
import { ShippingProps, ShippingStage } from "Apps/Order/Routes/Shipping2"
import { FormikProps } from "formik"
import {
  FulfillmentValues,
  SavedAddressType,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import createLogger from "Utils/logger"
import { Dialog } from "Apps/Order/Dialogs"
import { useHandleExchangeError } from "Apps/Order/Routes/Shipping2/Hooks/useHandleExchangeError"
import { graphql, useFragment } from "react-relay"

export interface State {
  // Form state for fulfillment details
  fulfillmentDetailsFormikContext: FormikProps<FulfillmentValues>
  // Whether to show the new address form or the saved addresses radio buttons
  shippingFormMode: "new_address" | "saved_addresses"
  // Presence of this value indicates that the user has saved their first address
  newSavedAddressID: string | null
  // Form state for saved address radio buttons
  selectedSavedAddressID: string | null
  // Form state for shipping quote radio buttons
  selectedShippingQuoteID: string | null
  // Stage of the shipping flow the user is in
  stage: ShippingStage
  // Manually set & unset when performing mutations
  isPerformingOperation: boolean
}

interface Actions {
  dialog: Dialog
  goBackToFulfillmentDetails: () => void
  handleExchangeError: (
    error: {
      code: string
      data: string | null | undefined
    },
    logger: ReturnType<typeof createLogger>
  ) => void
  setFulfillmentDetailsFormikContext: (
    payload: FormikProps<FulfillmentValues>
  ) => void
  setSelectedShippingQuote: (payload: string | null) => void
  setNewSavedAddressID: (payload: string | null) => void
  setSelectedSavedAddressID: (payload: string | null) => void
  setShippingFormMode: (payload: "new_address" | "saved_addresses") => void
  setIsPerformingOperation: (payload: boolean) => void
  setStage: (payload: ShippingStage) => void
}

export interface ShippingContextProps {
  actions: Actions
  state: State
  orderData: ComputedOrderData
  meData: {
    addressList: SavedAddressType[]
  }
}

export const ShippingContext = createContext<ShippingContextProps>({} as any)

export const ShippingContextProvider: FC<{
  order: ShippingContext_order$key
  me: ShippingContext_me$key
  dialog: ShippingProps["dialog"]
}> = props => {
  const orderFragmentData = useFragment(ORDER_FRAGMENT, props.order)
  const meFragmentData = useFragment(ME_FRAGMENT, props.me)
  const meData = useMemo(
    () => ({
      addressList: compact<SavedAddressType>(
        extractNodes(meFragmentData?.addressConnection) ?? []
      ),
    }),
    [meFragmentData.addressConnection]
  )

  const orderData = computeOrderData(orderFragmentData, meData)

  /*
   * Because there is a single button for both fulfillment details and
   * shipping quote steps (and duplicated in the sidebar)
   * we need to hack some formik values UP from the fulfillment details form.
   */
  const fulfillmentFormikRef = useRef<FormikProps<FulfillmentValues>>(({
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
  } as unknown) as FormikProps<FulfillmentValues>)

  const initialState: State = {
    fulfillmentDetailsFormikContext: fulfillmentFormikRef.current,
    shippingFormMode:
      meData.addressList.length > 0 ? "saved_addresses" : "new_address",
    isPerformingOperation: false,
    newSavedAddressID: null,
    selectedShippingQuoteID: orderData.selectedShippingQuoteID ?? null,
    stage: "fulfillment_details",
    selectedSavedAddressID:
      orderData.savedFulfillmentDetails?.selectedSavedAddressID ?? null,
  }

  const [state, dispatch] = useReducer(shippingStateReducer, initialState)

  const { handleExchangeError } = useHandleExchangeError({
    dialog: props.dialog,
    isArtsyShipping:
      orderData.savedFulfillmentDetails?.isArtsyShipping ?? false,
    orderData,
  })

  const dispatchActions = {
    setFulfillmentDetailsFormikContext: (
      formHelpers: FormikProps<FulfillmentValues>
    ) => {
      dispatch({ type: "SET_FULFILLMENT_DETAILS_CTX", payload: formHelpers })
    },
    setIsPerformingOperation: (payload: boolean) => {
      dispatch({ type: "SET_IS_PERFORMING_OPERATION", payload })
    },
    setNewSavedAddressID: (payload: string | null) => {
      dispatch({ type: "SET_NEW_SAVED_ADDRESS_ID", payload })
    },
    setSelectedShippingQuote: (payload: string | null) => {
      dispatch({ type: "SET_SELECTED_SHIPPING_QUOTE", payload })
    },
    setSelectedSavedAddressID: (payload: string | null) => {
      dispatch({ type: "SET_SELECTED_SAVED_ADDRESS_ID", payload })
    },
    setShippingFormMode: (payload: "new_address" | "saved_addresses") => {
      dispatch({ type: "SET_SHIPPING_FORM_MODE", payload })
    },
    setStage: (payload: ShippingStage) => {
      dispatch({ type: "SET_STAGE", payload })
    },
  }

  const goBackToFulfillmentDetails = () => {
    if (state.stage !== "fulfillment_details") {
      actions.setStage("fulfillment_details")
    }
  }
  const actions = {
    ...dispatchActions,
    goBackToFulfillmentDetails,
    dialog: props.dialog,
    handleExchangeError,
  }

  const contextProps = {
    actions,
    meData,
    orderData,
    state,
  }

  return (
    <ShippingContext.Provider value={contextProps}>
      {props.children}
    </ShippingContext.Provider>
  )
}

export type Action =
  | {
      type: "SET_FULFILLMENT_DETAILS_CTX"
      payload: FormikProps<FulfillmentValues>
    }
  | { type: "SET_IS_PERFORMING_OPERATION"; payload: boolean }
  | { type: "SET_NEW_SAVED_ADDRESS_ID"; payload: string | null }
  | { type: "SET_SELECTED_SHIPPING_QUOTE"; payload: string | null }
  | { type: "SET_SELECTED_SAVED_ADDRESS_ID"; payload: string | null }
  | {
      type: "SET_SHIPPING_FORM_MODE"
      payload: "new_address" | "saved_addresses"
    }
  | { type: "SET_STAGE"; payload: ShippingStage }

const shippingStateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FULFILLMENT_DETAILS_CTX": {
      return {
        ...state,
        fulfillmentDetailsFormikContext: action.payload,
      }
    }
    case "SET_IS_PERFORMING_OPERATION": {
      return {
        ...state,
        isPerformingOperation: action.payload,
      }
    }
    case "SET_NEW_SAVED_ADDRESS_ID": {
      return {
        ...state,
        newSavedAddressID: action.payload,
      }
    }
    case "SET_SELECTED_SAVED_ADDRESS_ID": {
      return {
        ...state,
        selectedSavedAddressID: action.payload,
      }
    }
    case "SET_SELECTED_SHIPPING_QUOTE": {
      return {
        ...state,
        selectedShippingQuoteID: action.payload,
      }
    }
    case "SET_SHIPPING_FORM_MODE": {
      return {
        ...state,
        shippingFormMode: action.payload,
      }
    }
    case "SET_STAGE": {
      return {
        ...state,
        stage: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

const ORDER_FRAGMENT = graphql`
  fragment ShippingContext_order on CommerceOrder {
    internalID
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
            processWithArtsyShippingDomestic
            artsyShippingInternational
            onlyShipsDomestically
            euShippingOrigin
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
