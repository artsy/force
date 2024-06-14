import { FulfillmentDetailsForm_order$key } from "__generated__/FulfillmentDetailsForm_order.graphql"
import { FC, useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"
import { FormikHelpers } from "formik"
import { extractNodes } from "Utils/extractNodes"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { FulfillmentDetailsForm } from "Apps/Order/Routes/Shipping2/Components/FulfillmentDetailsForm"
import {
  FulfillmentType,
  FulfillmentValues,
  ShipValues,
  addressWithFallbackValues,
  getDefaultUserAddress,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { FulfillmentDetailsForm_me$key } from "__generated__/FulfillmentDetailsForm_me.graphql"
import createLogger from "Utils/logger"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { ShippingContextProps } from "Apps/Order/Routes/Shipping2/ShippingContext"
import { useUserAddressUpdates } from "Apps/Order/Routes/Shipping2/Hooks/useUserAddressUpdates"
import { useRouter } from "System/Hooks/useRouter"
import { useOrderTracking } from "Apps/Order/Hooks/useOrderTracking"
import { useHandleSaveFulfillmentDetails } from "Apps/Order/Routes/Shipping2/Hooks/useHandleSaveFulfillmentDetails"

const logger = createLogger("Routes/Shipping2/FulfillmentDetails.tsx")

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

  const hasSavedAddresses = !!meData.addressConnection?.totalCount
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const firstArtwork = extractNodes(orderData.lineItems)[0]!.artwork!

  const initialValues = getInitialValues(
    shippingContext.meData,
    shippingContext.orderData
  )

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
    if (
      shippingContext.state.shippingFormMode !== "new_address" &&
      !hasSavedAddresses
    ) {
      shippingContext.actions.setShippingFormMode("new_address")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSavedAddresses])

  /*
   * Re-save fulfillment details on load if they are already saved
   * and shipping quotes need refreshing for new address mode only
   */
  useEffect(() => {
    const existingFulfillmentDetails =
      shippingContext.orderData.savedFulfillmentDetails
    if (
      existingFulfillmentDetails?.fulfillmentType === FulfillmentType.SHIP &&
      shippingContext.orderData.requiresArtsyShippingTo(
        existingFulfillmentDetails.attributes.country
      )
    ) {
      const refreshShippingQuotes = async () => {
        // instead of handleSubmit, call the save fulfillment details function
        // directly
        const result = await handleSaveFulfillmentDetails({
          attributes: existingFulfillmentDetails.attributes,
          fulfillmentType: FulfillmentType.SHIP,
          meta: {
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
      shippingContext.state.shippingFormMode === "new_address" &&
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
    _helpers: FormikHelpers<FulfillmentValues>
  ) => {
    // Trigger address verification and return early if appropriate
    if (shouldVerifyAddressOnSubmit(values)) {
      setVerifyAddressNow(true)
      return
    }

    const resetSelectedSavedAddress = () => {
      if (
        shippingContext.state.shippingFormMode === "saved_addresses" &&
        shippingContext.state.newSavedAddressID
      ) {
        shippingContext.actions.setSelectedSavedAddressID(
          shippingContext.state.selectedSavedAddressID
        )
      }
    }

    try {
      shippingContext.actions.setIsPerformingOperation(true)

      if (
        values.fulfillmentType === FulfillmentType.SHIP &&
        shippingContext.state.shippingFormMode === "new_address"
      ) {
        const userAddressUpdateResult = await handleNewUserAddressUpdates(
          values
        )

        if (userAddressUpdateResult) {
          if (userAddressUpdateResult.errors) {
            logger.error("Aborting: User address updates failed")
            shippingContext.actions.setIsPerformingOperation(false)
            // TODO: handle errors array by setting field values, showing dialog, etc
            return
          } else {
            if (userAddressUpdateResult.actionType === "create") {
              shippingContext.actions.setNewSavedAddressID(
                userAddressUpdateResult.data.internalID
              )
            } else if (userAddressUpdateResult.actionType === "delete") {
              shippingContext.actions.setNewSavedAddressID(null)
            }
            if (
              userAddressUpdateResult.data?.internalID &&
              shippingContext.state.shippingFormMode === "new_address"
            ) {
              shippingContext.actions.setNewSavedAddressID(
                userAddressUpdateResult.data.internalID
              )
            }
          }
        }
      }

      const saveFulfillmentDetailsResult = await handleSaveFulfillmentDetails(
        values
      )

      if (saveFulfillmentDetailsResult.data) {
        if (
          saveFulfillmentDetailsResult.data.requiresArtsyShippingToDestination
        ) {
          shippingContext.actions.setStage("shipping_quotes")
        } else if (shippingContext.state.shippingFormMode === "new_address") {
          // Advance to payment
          router.push(`/orders/${orderData.internalID}/payment`)
        } else {
          // Don't advance if we're using saved addresses; instead wait for click
          shippingContext.actions.setStage("fulfillment_details_saved")
        }
      } else {
        resetSelectedSavedAddress()
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
      resetSelectedSavedAddress()
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
    />
  )
}

const ORDER_FRAGMENT = graphql`
  fragment FulfillmentDetailsForm_order on CommerceOrder {
    internalID
    lineItems {
      edges {
        node {
          artwork {
            pickupAvailable
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
      totalCount
    }
  }
`

/**
 * Get form values for initial data or suitable for resetting to.
 */
const getInitialValues = (
  meData: ShippingContextProps["meData"],
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
        userAddressAction: null,
        addressVerifiedBy: null,
      },
    } as FulfillmentValues
  }

  const savedAddresses = meData.addressList

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
    },
  }
}
