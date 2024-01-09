import { FulfillmentDetailsForm_order$key } from "__generated__/FulfillmentDetailsForm_order.graphql"
import { FC, useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { useFeatureFlag } from "System/useFeatureFlag"
import {
  AddressFormMode,
  FulfillmentDetailsForm,
} from "Apps/Order/Routes/Shipping2/Components/FulfillmentDetailsForm"
import {
  FulfillmentType,
  FulfillmentValues,
  ShipValues,
  addressWithFallbackValues,
  getDefaultUserAddress,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import {
  FulfillmentDetailsForm_me$data,
  FulfillmentDetailsForm_me$key,
} from "__generated__/FulfillmentDetailsForm_me.graphql"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { ShippingContextProps } from "Apps/Order/Routes/Shipping2/ShippingContext"
import { useUserAddressUpdates } from "Apps/Order/Routes/Shipping2/Hooks/useUserAddressUpdates"
import { useRouter } from "System/Router/useRouter"
import { useOrderTracking } from "Apps/Order/Hooks/useOrderTracking"
import { FormikHelpers } from "formik"
import { useHandleSaveFulfillmentDetails } from "Apps/Order/Routes/Shipping2/Hooks/useHandleSaveFulfillmentDetails"
import { logger } from "Components/Inquiry/util"

export interface FulfillmentDetailsProps {
  me: FulfillmentDetailsForm_me$key
  order: FulfillmentDetailsForm_order$key
}

export const FulfillmentDetails: FC<FulfillmentDetailsProps> = ({
  me,
  order,
}) => {
  const meData = useFragment(ME_FRAGMENT, me)
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const { router } = useRouter()

  const shippingContext = useShippingContext()
  const orderTracking = useOrderTracking()
  const { handleNewUserAddressUpdates } = useUserAddressUpdates()
  const { handleSaveFulfillmentDetails } = useHandleSaveFulfillmentDetails()

  const addressVerificationUSEnabled = !!useFeatureFlag(
    "address_verification_us"
  )
  const addressVerificationIntlEnabled = !!useFeatureFlag(
    "address_verification_intl"
  )

  // Trigger address verification by setting this to true
  const [verifyAddressNow, setVerifyAddressNow] = useState<boolean>(false)

  const savedAddresses = extractNodes(meData.addressConnection)
  const hasSavedAddresses = savedAddresses.length > 0
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const firstArtwork = extractNodes(orderData.lineItems)[0]!.artwork!

  // Once the user sees the address form, they should always see it.
  const [forceNewAddressFormMode, setForceNewAddressFormMode] = useState(
    !hasSavedAddresses
  )

  const initialValues = getInitialValues(meData, shippingContext.orderData)

  const shippingMode: Exclude<AddressFormMode, "pickup"> = (() => {
    if (forceNewAddressFormMode || !hasSavedAddresses) {
      return "new_address"
    }
    return "saved_addresses"
  })()

  const availableFulfillmentTypes: FulfillmentType[] = firstArtwork.pickupAvailable
    ? [FulfillmentType.PICKUP, FulfillmentType.SHIP]
    : [FulfillmentType.SHIP]

  /**
   * Effects
   */

  /*
   * If the view ever has no saved addresses, force new address form mode for
   * the rest of its life
   */
  useEffect(() => {
    if (!forceNewAddressFormMode && !hasSavedAddresses) {
      setForceNewAddressFormMode(true)
    }
  }, [forceNewAddressFormMode, hasSavedAddresses])

  /*
   * Re-save fulfillment details on load if they are already saved
   * and shipping quotes need refreshing for new address mode only
   */
  useEffect(() => {
    const existingFulfillmentDetails =
      shippingContext.orderData.savedFulfillmentDetails
    if (
      existingFulfillmentDetails?.fulfillmentType === FulfillmentType.SHIP &&
      existingFulfillmentDetails.isArtsyShipping &&
      shippingMode === "new_address"
    ) {
      //  re-saving fulfillment details")
      const refreshShippingQuotes = async () => {
        const result = await handleSaveFulfillmentDetails({
          attributes: existingFulfillmentDetails.attributes as ShipValues["attributes"],
          fulfillmentType: FulfillmentType.SHIP,
          meta: {
            mode: "new_address",
            // FIXME: Will clobber previous address verification (but we can't
            // know what the previous status was unless we read from server)
            addressVerifiedBy: null,
          },
        })

        shippingContext.actions.setIsPerformingOperation(false)

        if (result) {
          shippingContext.actions.setStage("shipping_quotes")
        }
      }

      refreshShippingQuotes()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Handlers
   */
  const shouldVerifyAddressOnSubmit = (values: FulfillmentValues) => {
    const enabledForAddress =
      (values as ShipValues).attributes.country === "US"
        ? addressVerificationUSEnabled
        : addressVerificationIntlEnabled

    return (
      values.fulfillmentType === FulfillmentType.SHIP &&
      shippingMode === "new_address" &&
      enabledForAddress &&
      values.meta.addressVerifiedBy === null
    )
  }

  const handleVerificationComplete = () => {
    setVerifyAddressNow(false)
  }

  /*
   * Handle form submission including address verification, saved address updates
   * and saving fulfillment details to order
   */
  const handleSubmit = async (
    values: FulfillmentValues,
    helpers: FormikHelpers<FulfillmentValues>
  ) => {
    // Trigger address verification and return early if appropriate
    if (shouldVerifyAddressOnSubmit(values)) {
      setVerifyAddressNow(true)
      return
    }

    try {
      shippingContext.actions.setIsPerformingOperation(true)

      if (values.fulfillmentType === FulfillmentType.SHIP) {
        const userAddressUpdateResult = await handleNewUserAddressUpdates(
          values
        )

        if (userAddressUpdateResult) {
          if (userAddressUpdateResult.errors) {
            logger.error("Aborting: User address updates failed")
            shippingContext.actions.setIsPerformingOperation(false)

            return
          } else {
            if (userAddressUpdateResult.actionType === "create") {
              shippingContext.actions.setNewSavedAddressId(
                userAddressUpdateResult.data.internalID
              )
            } else if (userAddressUpdateResult.actionType === "delete") {
              shippingContext.actions.setNewSavedAddressId(null)
            }

            // TODO: double check if we need this and continue from here
            helpers.setValues({
              ...values,
              meta: {
                ...values.meta,
              },
            })

            if (
              userAddressUpdateResult.data?.internalID &&
              shippingMode === "new_address"
            ) {
              shippingContext.actions.setNewSavedAddressId(
                userAddressUpdateResult.data.internalID
              )
            }
          }
        }
      }

      const saveFulfillmentDetailsResult = await handleSaveFulfillmentDetails(
        values,
        helpers
      )

      if (saveFulfillmentDetailsResult.data) {
        if (
          saveFulfillmentDetailsResult.data.requiresArtsyShippingToDestination
        ) {
          // TODO: move to caller
          // if (shippingContext.state.addressModalAction) {
          //   shippingContext.actions.setAddressModalAction(null)
          // }
          shippingContext.actions.setStage("shipping_quotes")
        } else if (shippingMode === "new_address") {
          // Advance to payment
          router.push(`/orders/${orderData.internalID}/payment`)
        } else {
          // Don't advance if we're using saved addresses; instead wait for click
          shippingContext.actions.setStage("advance_on_click")
        }
      } else {
        logger.error(
          "No request for saveFulfillmentDetails - this should not happen"
        )
      }
    } catch (error) {
      orderTracking.errorMessageViewed({
        error_code: null,
        title: "An error occurred",
        message:
          "Something went wrong. Please try again or contact orders@artsy.net.",
        flow: "user selects a shipping option",
      })

      shippingContext.actions.dialog.showErrorDialog()
    } finally {
      shippingContext.actions.setIsPerformingOperation(false)
    }
  }

  return (
    <FulfillmentDetailsForm
      initialValues={initialValues}
      onAddressVerificationComplete={handleVerificationComplete}
      me={meData}
      verifyAddressNow={verifyAddressNow}
      onSubmit={handleSubmit}
      availableFulfillmentTypes={availableFulfillmentTypes}
      shippingMode={shippingMode}
    />
  )
}

const ORDER_FRAGMENT = graphql`
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
`

const ME_FRAGMENT = graphql`
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

/**
 * Get form values for initial data or suitable for resetting to.
 */
const getInitialValues = (
  me: FulfillmentDetailsForm_me$data,
  orderData: ShippingContextProps["orderData"],
  forceNewAddressFormMode?: boolean
): FulfillmentValues => {
  if (orderData.savedFulfillmentDetails) {
    return {
      fulfillmentType: orderData.savedFulfillmentDetails.fulfillmentType,
      attributes: {
        ...addressWithFallbackValues(
          orderData.savedFulfillmentDetails.attributes
        ),
      },
      meta: {
        mode: "pickup",
        userAddressAction: null,
        addressVerifiedBy: null,
      },
    } as FulfillmentValues
  }

  const savedAddresses = extractNodes(me.addressConnection)
  const mode =
    forceNewAddressFormMode || !savedAddresses.length
      ? "new_address"
      : "saved_addresses"
  // The default ship-to address should be the first one that
  // can be shipped-to, preferring the default

  const defaultUserAddress = getDefaultUserAddress(
    savedAddresses,
    orderData.availableShippingCountries
  )

  if (defaultUserAddress) {
    return {
      fulfillmentType: FulfillmentType.SHIP,
      attributes: addressWithFallbackValues(defaultUserAddress),
      meta: {
        saveAddress: false,
        addressVerifiedBy: null,
        mode,
      },
    }
  }

  // The user doesn't have a valid ship-to address, so we'll return empty values.
  // TODO: This doesn't account for matching the saved address id
  // (that is still in parsedOrderData). In addition the initial values
  // are less relevant if the user has saved addresses - Setting country
  // doesn't matter.
  const initialFulfillmentValues: ShipValues["attributes"] = addressWithFallbackValues(
    { country: orderData.shipsFrom }
  )

  return {
    fulfillmentType: FulfillmentType.SHIP,
    attributes: initialFulfillmentValues,
    meta: {
      addressVerifiedBy: null,
      saveAddress: true,
      mode,
    },
  }
}
