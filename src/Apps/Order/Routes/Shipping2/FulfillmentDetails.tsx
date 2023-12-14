import { FulfillmentDetailsForm_order$data } from "__generated__/FulfillmentDetailsForm_order.graphql"
import { FC, useEffect, useRef, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { useFeatureFlag } from "System/useFeatureFlag"
import {
  AddressFormMode,
  FulfillmentDetailsForm,
} from "Apps/Order/Routes/Shipping2/FulfillmentDetailsForm"
import {
  FulfillmentType,
  FulfillmentValues,
  ShipValues,
  addressWithFallbackValues,
  getDefaultUserAddress,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { FulfillmentDetailsForm_me$data } from "__generated__/FulfillmentDetailsForm_me.graphql"
import createLogger from "Utils/logger"
import { useSaveFulfillmentDetails } from "Apps/Order/Routes/Shipping2/Mutations/useSaveFulfillmentDetails"
import { CommerceSetShippingInput } from "__generated__/useSaveFulfillmentDetailsMutation.graphql"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { ShippingContextProps } from "Apps/Order/Routes/Shipping2/Utils/ShippingContext/ShippingContext"

const logger = createLogger("Routes/Shipping2/FulfillmentDetails.tsx")

export interface FulfillmentDetailsProps {
  handleUserAddressUpdates: (newValues: FulfillmentValues) => Promise<void>
  onFulfillmentDetailsSaved: (result: {
    requiresArtsyShipping: boolean
  }) => void
  me: FulfillmentDetailsForm_me$data
  order: FulfillmentDetailsForm_order$data
}

export const FulfillmentDetails: FC<FulfillmentDetailsProps> = props => {
  const shippingContext = useShippingContext()
  const saveFulfillmentDetails = useSaveFulfillmentDetails()

  const addressVerificationUSEnabled = !!useFeatureFlag(
    "address_verification_us"
  )
  const addressVerificationIntlEnabled = !!useFeatureFlag(
    "address_verification_intl"
  )

  const hasSavedAddresses = extractNodes(props.me.addressConnection).length
  const shouldVerifyAddressOnSubmit = (values: FulfillmentValues) => {
    const enabledForAddress =
      (values as ShipValues).attributes.country === "US"
        ? addressVerificationUSEnabled
        : addressVerificationIntlEnabled

    return (
      values.fulfillmentType === FulfillmentType.SHIP &&
      !hasSavedAddresses &&
      enabledForAddress &&
      values.attributes.addressVerifiedBy === null
    )
  }

  // trigger address verification by setting this to true
  const [verifyAddressNow, setVerifyAddressNow] = useState<boolean>(false)

  const handleVerificationComplete = () => {
    setVerifyAddressNow(false)
  }

  // Once the user sees the address form, they should always see it.
  const [forceNewAddressFormMode, setForceNewAddressFormMode] = useState(
    !hasSavedAddresses
  )

  useEffect(() => {
    if (!forceNewAddressFormMode && !hasSavedAddresses) {
      setForceNewAddressFormMode(true)
    }
  }, [forceNewAddressFormMode, hasSavedAddresses])

  const savedAddresses = extractNodes(props.me.addressConnection)
  const shippingMode: Exclude<AddressFormMode, "pickup"> =
    forceNewAddressFormMode || savedAddresses.length === 0
      ? "new_address"
      : "saved_addresses"

  const submitFulfillmentDetails = async ({
    performUserAddressUpdates,
    formValues,
  }: {
    performUserAddressUpdates: boolean
    formValues: FulfillmentValues
  }) => {
    try {
      let fulfillmentMutationValues: CommerceSetShippingInput
      let requiresArtsyShippingToDestination: boolean
      shippingContext.helpers.setIsPerformingOperation(true)

      if (formValues.fulfillmentType === FulfillmentType.SHIP) {
        const {
          saveAddress,
          addressVerifiedBy,
          phoneNumber,
          ...addressValues
        } = formValues.attributes
        requiresArtsyShippingToDestination = shippingContext.parsedOrderData.requiresArtsyShippingTo(
          addressValues.country
        )

        fulfillmentMutationValues = {
          id: props.order.internalID,
          fulfillmentType: requiresArtsyShippingToDestination
            ? "SHIP_ARTA"
            : FulfillmentType.SHIP,
          phoneNumber,
          shipping: { ...addressValues, phoneNumber: "" },
        }

        if (addressVerifiedBy) {
          fulfillmentMutationValues.addressVerifiedBy = addressVerifiedBy
        }
      } else {
        requiresArtsyShippingToDestination = false

        fulfillmentMutationValues = {
          id: props.order.internalID,
          fulfillmentType: FulfillmentType.PICKUP,
          phoneNumber: formValues.attributes.phoneNumber,
          shipping: {
            addressLine1: "",
            addressLine2: "",
            country: "",
            name: "",
            city: "",
            postalCode: "",
            region: "",
            phoneNumber: "",
          },
        }
      }

      const result = await saveFulfillmentDetails.submitMutation({
        variables: { input: fulfillmentMutationValues },
      })

      const orderOrError = result.commerceSetShipping?.orderOrError

      if (orderOrError?.__typename === "CommerceOrderWithMutationFailure") {
        shippingContext.helpers.handleExchangeError(orderOrError.error, logger)
        return
      }

      if (performUserAddressUpdates) {
        await props.handleUserAddressUpdates(formValues)
      }

      props.onFulfillmentDetailsSaved({
        requiresArtsyShipping: requiresArtsyShippingToDestination,
      })
    } catch (error) {
      console.log("error: ", error)
      shippingContext.helpers.orderTracking.errorMessageViewed({
        error_code: null,
        title: "An error occurred",
        message:
          "Something went wrong. Please try again or contact orders@artsy.net.",
        flow: "user selects a shipping option",
      })

      shippingContext.helpers.dialog.showErrorDialog()
    } finally {
      shippingContext.helpers.setIsPerformingOperation(false)
    }
  }

  // Force-re-save fulfillment details with existing values to refresh shipping quotes
  useEffect(() => {
    const existingFulfillmentDetails =
      shippingContext.parsedOrderData.savedFulfillmentDetails
    if (
      shippingContext.state.stage === "refresh_shipping_quotes" &&
      existingFulfillmentDetails?.fulfillmentType === FulfillmentType.SHIP
    ) {
      submitFulfillmentDetails({
        performUserAddressUpdates: false,
        formValues: {
          attributes: existingFulfillmentDetails.fulfillmentDetails as ShipValues["attributes"],
          fulfillmentType: existingFulfillmentDetails?.fulfillmentType,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = values => {
    if (shouldVerifyAddressOnSubmit(values)) {
      setVerifyAddressNow(true)
      return
    } else {
      return submitFulfillmentDetails({
        performUserAddressUpdates: forceNewAddressFormMode,
        formValues: values,
      })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const firstArtwork = extractNodes(props.order.lineItems)[0]!.artwork!

  const availableFulfillmentTypes: FulfillmentType[] = firstArtwork.pickupAvailable
    ? [FulfillmentType.PICKUP, FulfillmentType.SHIP]
    : [FulfillmentType.SHIP]

  // Only process once on load
  const initialValues = useRef(
    getInitialValues(props.me, shippingContext.parsedOrderData)
  ).current

  return (
    <FulfillmentDetailsForm
      initialValues={initialValues}
      onAddressVerificationComplete={handleVerificationComplete}
      me={props.me}
      verifyAddressNow={verifyAddressNow}
      onSubmit={handleSubmit}
      availableFulfillmentTypes={availableFulfillmentTypes}
      shippingMode={shippingMode}
    />
  )
}

export const FulfillmentDetailsFragmentContainer = createFragmentContainer(
  FulfillmentDetails,
  {
    order: graphql`
      fragment FulfillmentDetailsForm_order on CommerceOrder {
        internalID
        mode
        state
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
              artwork {
                slug
                processWithArtsyShippingDomestic
                artsyShippingInternational
                pickupAvailable
                onlyShipsDomestically
                euShippingOrigin
                shippingCountry
              }
              shippingQuoteOptions {
                edges {
                  ...ShippingQuotes_shippingQuotes
                  node {
                    id
                    isSelected
                  }
                }
              }
            }
          }
        }
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
        ...OrderStepper_order
      }
    `,
    me: graphql`
      fragment FulfillmentDetailsForm_me on Me
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 30 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        name
        email
        id
        location {
          country
        }
        ...SavedAddresses2_me
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
    `,
  }
)

const getInitialValues = (
  me: FulfillmentDetailsForm_me$data,
  orderData: ShippingContextProps["parsedOrderData"]
): FulfillmentValues => {
  if (orderData.savedFulfillmentDetails) {
    return {
      fulfillmentType: orderData.savedFulfillmentDetails.fulfillmentType,
      attributes: {
        ...addressWithFallbackValues(
          orderData.savedFulfillmentDetails.fulfillmentDetails
        ),
        saveAddress: false,
        addressVerifiedBy: null,
      },
    } as FulfillmentValues
  }

  const savedAddresses = extractNodes(me.addressConnection)
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
      fulfillmentType: FulfillmentType.SHIP,
      attributes: {
        ...shippableDefaultAddress,
        saveAddress: false,
        addressVerifiedBy: null,
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
    fulfillmentType: FulfillmentType.SHIP,
    attributes: initialFulfillmentValues,
  }
}
