import { createContext, useContext, useMemo, useState } from "react"
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
} from "Apps/Order/Routes/Shipping2/shippingUtils"
import { extractNodes } from "Utils/extractNodes"
import {
  ParsedOrderData,
  useParseOrderData,
} from "Apps/Order/Routes/Shipping2/shippingContextHelpers/useParseOrderData"

type FulfillmentHelpers = Pick<
  FormikProps<FulfillmentValues>,
  "handleSubmit" | "isValid" | "values"
>
export interface ShippingContextProps {
  parsedOrderData: ParsedOrderData
  initialValues: {
    fulfillmentDetails: FulfillmentValues
    shippingQuotes: {
      selectedShippingQuoteId: any
    }
  }
  step: ShippingRouteStep
  helpers: {
    fulfillmentDetails: FulfillmentHelpers & {
      setFulfillmentFormHelpers: (helpers: FulfillmentHelpers) => void
    }
  }
}

export const ShippingContext = createContext<ShippingContextProps>({} as any)

export const useShippingContext = () => {
  return useContext(ShippingContext)
}

// Get information from the order and user, parsedOrderData (shared, computed context about order)
// initial values for forms, and the current step in the shipping route
// values for forms
export const useComputeShippingContext = (
  props: ShippingProps
): ShippingContextProps => {
  const parsedOrderData = useParseOrderData(props)
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
      fulfillmentDetails: useFulfillmentDetailsHelpers(),
    },
  }
}

const useFulfillmentDetailsHelpers = (): ShippingContextProps["helpers"]["fulfillmentDetails"] => {
  // Because there is a single button for both fulfillment details and
  // shipping quote steps (and duplicated in the sidebar)
  // we need to hack some formik values UP from the fulfillment details
  // form.
  // handleSubmit: Used to submit the form
  // isValid: Used to disable the button
  // values: Used to get the form values for un-saving the address if the user
  //   unchecks it after saving it in the fulfillment details step.
  const [fulfillmentFormHelpers, setFulfillmentFormHelpers] = useState<
    Pick<FormikProps<FulfillmentValues>, "handleSubmit" | "isValid" | "values">
  >({
    handleSubmit: () => {},
    isValid: false,
    values: {
      attributes: {
        saveAddress: false,
      },
    } as any,
  })
  return {
    ...fulfillmentFormHelpers,
    setFulfillmentFormHelpers,
  }
}

const getInitialValues = (
  props: ShippingProps,
  orderData: ShippingContextProps["parsedOrderData"]
): ShippingContextProps["initialValues"] => {
  const { me } = props

  const selectedShippingQuote =
    (orderData.shippingQuotes &&
      orderData.shippingQuotes.find(quote => quote.isSelected)) ||
    null

  const initialShippingQuotes = {
    selectedShippingQuoteId: selectedShippingQuote?.id,
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
