import { useContext, useMemo, useState } from "react"
import { FormikProps } from "formik"
import { ShippingProps, ShippingRouteStep } from "Apps/Order/Routes/Shipping2"
import {
  FulfillmentValues,
  ShipValues,
} from "Apps/Order/Routes/Shipping2/FulfillmentDetails"
import {
  addressWithFallbackValues,
  getDefaultUserAddress,
  FulfillmentType,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { extractNodes } from "Utils/extractNodes"
import { useParseOrderData } from "Apps/Order/Routes/Shipping2/Hooks/useParseOrderData"
import {
  ShippingContext,
  ShippingContextProps,
} from "Apps/Order/Routes/Shipping2/Utils/ShippingContext"

export const useShippingContext = () => {
  return useContext(ShippingContext)
}

/**
 * Load the full shipping context from its top-level route using relay props.
 */
export const useComputeShippingContext = (
  props: ShippingProps
): ShippingContextProps => {
  const parsedOrderData = useParseOrderData(props)

  /**
   * Because there is a single button for both fulfillment details and
   * shipping quote steps (and duplicated in the sidebar)
   * we need to hack some formik values UP from the fulfillment details form.
   *
   * Currently we need to pass up:
   */
  const [fulfillmentFormHelpers, setFulfillmentFormHelpers] = useState<
    Pick<FormikProps<FulfillmentValues>, "handleSubmit" | "isValid" | "values">
  >({
    // Used to submit the form
    handleSubmit: () => {},
    // Used to disable the button
    isValid: false,
    // Used to get the form values for un-saving the address if the user
    // unchecks it after saving it in the fulfillment details step.
    values: ({
      attributes: {
        saveAddress: false,
      },
    } as unknown) as FulfillmentValues,
  })
  const fulfillmentDetailsHelpers = {
    ...fulfillmentFormHelpers,
    setFulfillmentFormHelpers,
  }

  const initialValues = getInitialValues(props, parsedOrderData)

  const { isArtsyShipping } = parsedOrderData

  const step: ShippingRouteStep = useMemo(() => {
    if (isArtsyShipping) {
      return "shipping_quotes"
    }
    return "fulfillment_details"
  }, [isArtsyShipping])

  return {
    parsedOrderData,
    initialValues,
    step,
    helpers: {
      fulfillmentDetails: fulfillmentDetailsHelpers,
    },
  }
}

const getInitialValues = (
  props: ShippingProps,
  orderData: ShippingContextProps["parsedOrderData"]
): ShippingContextProps["initialValues"] => {
  const { me } = props
  const initialShippingQuotes = {
    selectedShippingQuoteId: orderData.selectedShippingQuoteId,
  }

  if (orderData.fulfillmentType) {
    return {
      shippingQuotes: initialShippingQuotes,
      fulfillmentDetails: {
        fulfillmentType: orderData.fulfillmentType,
        attributes: {
          ...addressWithFallbackValues(orderData.fulfillmentDetails),
          saveAddress: false,
          addressVerifiedBy: null,
        },
      } as FulfillmentValues,
    }
  }
  const savedAddresses = extractNodes(me?.addressConnection) ?? []

  // The default ship-to address should be the first one that
  // can be shipped-to, preferring the default

  const defaultUserAddress = getDefaultUserAddress(
    savedAddresses,
    orderData.availableShippingCountries
  )

  const shippableDefaultAddress = defaultUserAddress
    ? addressWithFallbackValues(defaultUserAddress)
    : null

  if (shippableDefaultAddress) {
    return {
      shippingQuotes: initialShippingQuotes,
      fulfillmentDetails: {
        fulfillmentType: FulfillmentType.SHIP,
        attributes: {
          ...shippableDefaultAddress,
          saveAddress: false,
          addressVerifiedBy: null,
        },
      },
    }
  }

  // The user doesn't have a valid ship-to address, so we'll return empty values.
  // TODO: This doesn't account for matching the saved address id
  // (that is still in parsedOrderData). In addition the initial values
  // are less relevant if the user has saved addresses - Setting country
  // doesn't matter.
  const initialFulfillmentValues: ShipValues["attributes"] = {
    ...addressWithFallbackValues({ country: orderData.shipsFrom }),

    addressVerifiedBy: null,
    saveAddress: savedAddresses.length === 0,
  }

  return {
    shippingQuotes: initialShippingQuotes,
    fulfillmentDetails: {
      fulfillmentType: FulfillmentType.SHIP,
      attributes: initialFulfillmentValues,
    },
  }
}
