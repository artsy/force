import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
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
  ShippingAddressFormValues,
} from "Apps/Order/Routes/Shipping2/shippingUtils"
import { SavedAddressType } from "Apps/Order/Utils/shippingUtils"
import { extractNodes } from "Utils/extractNodes"
import { ALL_COUNTRY_CODES, EU_COUNTRY_CODES } from "Components/CountrySelect"
import { COUNTRIES_IN_EUROPEAN_UNION } from "@artsy/commerce_helpers"
// TODO: Duplicated list ^

type FulfillmentHelpers = Pick<
  FormikProps<FulfillmentValues>,
  "handleSubmit" | "isValid" | "values"
>
export interface ShippingContextProps {
  savedOrderData: {
    lockShippingCountryTo: "EU" | string | null
    shipsFrom: string
    availableShippingCountries: string[]
    requiresArtsyShippingTo: (shipTo: string) => boolean
    selectedSavedAddressId: string | null
    fulfillmentDetails: FulfillmentValues["attributes"] | null
    fulfillmentType: FulfillmentValues["fulfillmentType"] | null
    isArtsyShipping?: boolean
    shippingQuotes?: Array<{ id: string; isSelected: boolean }>
  }
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

// Get information from the order and user, savedOrderData (shared, computed context about order)
// initial values for forms, and the current step in the shipping route
// values for forms
export const useLoadOrder = (props: ShippingProps): ShippingContextProps => {
  const savedOrderData = useLoadComputedData(props)
  const initialValues = getInitialValues(props, savedOrderData)

  const {
    fulfillmentType: savedFulfillmentType,

    isArtsyShipping,
  } = savedOrderData
  const selectedShippingQuoteId =
    initialValues.shippingQuotes.selectedShippingQuoteId

  const targetStep: ShippingRouteStep = useMemo(() => {
    if (!savedFulfillmentType) {
      return "fulfillment_details"
    }
    if (isArtsyShipping && !selectedShippingQuoteId) {
      return "shipping_quotes"
    }
    if (isArtsyShipping && selectedShippingQuoteId) {
      return "ready_to_proceed"
    }
    if (!!savedFulfillmentType && !isArtsyShipping) {
      return "ready_to_proceed"
    }
    return "fulfillment_details"
  }, [isArtsyShipping, savedFulfillmentType, selectedShippingQuoteId])

  return {
    savedOrderData: savedOrderData,
    initialValues,
    step: targetStep,
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
  orderData: ShippingContextProps["savedOrderData"]
): ShippingContextProps["initialValues"] => {
  const { me } = props
  const {
    fulfillmentType: savedFulfillmentType,
    fulfillmentDetails: savedFulfillmentDetails,
    shippingQuotes,
  } = orderData
  const selectedShippingQuote =
    (shippingQuotes && shippingQuotes.find(quote => quote.isSelected)) || null

  const initialShippingQuotes = {
    selectedShippingQuoteId: selectedShippingQuote?.id,
  }
  if (savedFulfillmentType) {
    return {
      shippingQuotes: initialShippingQuotes,
      fulfillmentDetails: {
        fulfillmentType: savedFulfillmentType,
        attributes: {
          ...addressWithFallbackValues(savedFulfillmentDetails),
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
  // (that is still in savedOrderData). In addition the initial values
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

const matchAddressFields = (...addressPair: [object, object]) => {
  const [a1, a2] = addressPair.map(a => addressWithFallbackValues(a))
  return (
    a1.addressLine1 === a2.addressLine1 &&
    a1.addressLine2 === a2.addressLine2 &&
    a1.city === a2.city &&
    a1.country === a2.country &&
    a1.name === a2.name &&
    a1.phoneNumber === a2.phoneNumber &&
    a1.postalCode === a2.postalCode &&
    a1.region === a2.region
  )
}

const getSavedFulfillmentData = (
  order: ShippingProps["order"],
  me: ShippingProps["me"]
): {
  fulfillmentType: FulfillmentType
  isArtsyShipping: boolean
  fulfillmentDetails: FulfillmentValues["attributes"]
  selectedSavedAddressId: string | null
} | null => {
  if (
    !order.requestedFulfillment ||
    Object.keys(order.requestedFulfillment).length === 0
  ) {
    return null
  }

  const requestedFulfillmentType = order.requestedFulfillment.__typename
  if (requestedFulfillmentType === "CommercePickup") {
    const phoneNumber = order.requestedFulfillment.phoneNumber!
    return {
      fulfillmentType: FulfillmentType.PICKUP,
      isArtsyShipping: false,
      // TODO: [When things are working again]
      // figure out what `name` is used for w/ pickup, where to get it from
      fulfillmentDetails: { phoneNumber } as FulfillmentValues["attributes"],
      selectedSavedAddressId: null,
    }
  }
  const fulfillmentDetails: ShippingAddressFormValues = addressWithFallbackValues(
    order.requestedFulfillment
  )

  const addressList =
    extractNodes(me?.addressConnection) ??
    ([] as SavedAddressType[]).filter(a => !!a)

  // we don't store the address id on exchange orders, so we need to match every field
  const selectedSavedAddressId =
    addressList.find(node => matchAddressFields(node, fulfillmentDetails))
      ?.internalID || null

  if (requestedFulfillmentType === "CommerceShipArta") {
    return {
      fulfillmentType: FulfillmentType.SHIP,
      isArtsyShipping: true,
      fulfillmentDetails,
      selectedSavedAddressId,
    }
  }
  if (requestedFulfillmentType === "CommerceShip") {
    return {
      fulfillmentType: FulfillmentType.SHIP,
      isArtsyShipping: false,
      fulfillmentDetails,
      selectedSavedAddressId,
    }
  }
  // Should never happen. Log it?
  return null
}

// Compute and memoize data from the saved order.
export const useLoadComputedData = (
  props: ShippingProps
): ShippingContextProps["savedOrderData"] => {
  const { me, order } = props
  const firstLineItem = extractNodes(order.lineItems)[0]!
  const firstArtwork = firstLineItem.artwork!
  const artworkCountry = firstArtwork?.shippingCountry
  const savedFulfillmentData = getSavedFulfillmentData(order, me)

  const shipsFrom = firstArtwork.shippingCountry!
  const domesticOnly = !!firstArtwork.onlyShipsDomestically
  const euOrigin = !!firstArtwork.euShippingOrigin

  const lockShippingCountryTo = domesticOnly
    ? euOrigin
      ? "EU"
      : shipsFrom
    : null

  const availableShippingCountries = !lockShippingCountryTo
    ? ALL_COUNTRY_CODES
    : lockShippingCountryTo === "EU"
    ? EU_COUNTRY_CODES
    : [lockShippingCountryTo]

  const requiresArtsyShippingTo = useCallback(
    (shipToCountry: string) => {
      const isDomesticShipping =
        (shipToCountry && shipToCountry === artworkCountry) ||
        (COUNTRIES_IN_EUROPEAN_UNION.includes(shipToCountry) &&
          COUNTRIES_IN_EUROPEAN_UNION.includes(artworkCountry))

      const requiresArtsyShipping =
        (isDomesticShipping &&
          firstArtwork?.processWithArtsyShippingDomestic) ||
        (!isDomesticShipping && firstArtwork?.artsyShippingInternational)
      return requiresArtsyShipping
    },
    [
      artworkCountry,
      firstArtwork.artsyShippingInternational,
      firstArtwork.processWithArtsyShippingDomestic,
    ]
  )

  const shippingQuotes = extractNodes(firstLineItem.shippingQuoteOptions) ?? []

  return {
    fulfillmentDetails: savedFulfillmentData?.fulfillmentDetails || null,
    fulfillmentType: savedFulfillmentData?.fulfillmentType || null,
    selectedSavedAddressId:
      savedFulfillmentData?.selectedSavedAddressId || null,
    isArtsyShipping: savedFulfillmentData?.isArtsyShipping,
    shippingQuotes,
    availableShippingCountries,
    lockShippingCountryTo,
    requiresArtsyShippingTo,
    shipsFrom,
  }
}
