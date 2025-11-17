import { useOrderTracking } from "Apps/Order/Hooks/useOrderTracking"
import { FulfillmentDetailsForm } from "Apps/Order/Routes/Shipping/Components/FulfillmentDetailsForm"
import { useHandleSaveFulfillmentDetails } from "Apps/Order/Routes/Shipping/Hooks/useHandleSaveFulfillmentDetails"
import { useShippingContext } from "Apps/Order/Routes/Shipping/Hooks/useShippingContext"
import { useUserAddressUpdates } from "Apps/Order/Routes/Shipping/Hooks/useUserAddressUpdates"
import type { ShippingContextProps } from "Apps/Order/Routes/Shipping/ShippingContext"
import {
  FulfillmentType,
  type FulfillmentValues,
  type ShipValues,
  addressWithFallbackValues,
  getInitialShippingValues,
} from "Apps/Order/Routes/Shipping/Utils/shippingUtils"
import { useFlag } from "System/FeatureFlags/useFlag"
import { useRouter } from "System/Hooks/useRouter"
import { extractNodes } from "Utils/extractNodes"
import createLogger from "Utils/logger"
import type { FulfillmentDetailsForm_me$key } from "__generated__/FulfillmentDetailsForm_me.graphql"
import type { FulfillmentDetailsForm_order$key } from "__generated__/FulfillmentDetailsForm_order.graphql"
import type { FormikHelpers } from "formik"
import { type FC, useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Routes/Shipping/FulfillmentDetails.tsx")

export interface FulfillmentDetailsProps {
  me: FulfillmentDetailsForm_me$key
  order: FulfillmentDetailsForm_order$key
}

export const FulfillmentDetails: FC<
  React.PropsWithChildren<FulfillmentDetailsProps>
> = ({ me, order }) => {
  const meData = useFragment(ME_FRAGMENT, me)
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const { router } = useRouter()
  const shippingContext = useShippingContext()
  const orderTracking = useOrderTracking()
  const { handleNewUserAddressUpdates } = useUserAddressUpdates()
  const { handleSaveFulfillmentDetails } = useHandleSaveFulfillmentDetails()

  const addressVerificationUSEnabled = !!useFlag("address_verification_us")

  // Trigger address verification by setting this to true
  const [verifyAddressNow, setVerifyAddressNow] = useState<boolean>(false)

  const hasSavedAddresses = shippingContext.meData.addressList.length !== 0
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const firstArtwork = extractNodes(orderData.lineItems)[0]!.artwork!

  const initialValues = getInitialValues(
    shippingContext.meData,
    shippingContext.orderData,
  )

  const availableFulfillmentTypes: FulfillmentType[] =
    firstArtwork.pickupAvailable
      ? [FulfillmentType.PICKUP, FulfillmentType.SHIP]
      : [FulfillmentType.SHIP]

  /**
   * Effects
   */

  /*
   * If the view ever has no saved addresses, force new address form mode for
   * the rest of its life and reset values
   */

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const formLoaded =
      typeof shippingContext.state.fulfillmentDetailsFormikContext.setValues ===
      "function"
    if (
      formLoaded &&
      shippingContext.state.shippingFormMode === "saved_addresses" &&
      !hasSavedAddresses
    ) {
      const emptyFormValues = getInitialShippingValues(
        shippingContext.meData.addressList,
        shippingContext.orderData.shipsFrom,
        shippingContext.meData.name,
        shippingContext.orderData.availableShippingCountries,
      )

      shippingContext.state.fulfillmentDetailsFormikContext.setValues(
        emptyFormValues,
      )
      shippingContext.actions.setShippingFormMode("new_address")
    }
  }, [hasSavedAddresses])

  /*
   * Re-save fulfillment details on load if they are already saved &
   * require artsy shipping
   */

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const { savedFulfillmentDetails } = shippingContext.orderData

    const isArtsyShippingSaved =
      savedFulfillmentDetails?.fulfillmentType === FulfillmentType.SHIP &&
      savedFulfillmentDetails.isArtsyShipping

    if (isArtsyShippingSaved) {
      const refreshShippingQuotes = async () => {
        // instead of handleSubmit, call the save fulfillment details function
        // directly
        const result = await handleSaveFulfillmentDetails({
          attributes: savedFulfillmentDetails.attributes,
          fulfillmentType: FulfillmentType.SHIP,
          meta: {
            // FIXME: Will clobber previous address verification (but we can't
            // know what the previous status was until we can read from server)
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
  }, [])

  /**
   * Handlers
   */
  const shouldVerifyAddressOnSubmit = (values: FulfillmentValues) => {
    const enabledForAddress =
      (values as ShipValues).attributes.country === "US" &&
      addressVerificationUSEnabled

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
    _helpers: FormikHelpers<FulfillmentValues>,
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
          shippingContext.state.selectedSavedAddressID,
        )
      }
    }

    try {
      shippingContext.actions.setIsPerformingOperation(true)

      if (
        values.fulfillmentType === FulfillmentType.SHIP &&
        shippingContext.state.shippingFormMode === "new_address"
      ) {
        const userAddressUpdateResult =
          await handleNewUserAddressUpdates(values)

        if (userAddressUpdateResult) {
          if (userAddressUpdateResult.errors) {
            logger.error("Aborting: User address updates failed")
            shippingContext.actions.setIsPerformingOperation(false)
            // TODO: handle errors array by setting field values, showing dialog, etc
            return
          } else {
            if (userAddressUpdateResult.actionType === "create") {
              shippingContext.actions.setNewSavedAddressID(
                userAddressUpdateResult.data.internalID,
              )
            } else if (userAddressUpdateResult.actionType === "delete") {
              shippingContext.actions.setNewSavedAddressID(null)
            }
            if (
              userAddressUpdateResult.data?.internalID &&
              shippingContext.state.shippingFormMode === "new_address"
            ) {
              shippingContext.actions.setNewSavedAddressID(
                userAddressUpdateResult.data.internalID,
              )
            }
          }
        }
      }

      const saveFulfillmentDetailsResult =
        await handleSaveFulfillmentDetails(values)

      if (saveFulfillmentDetailsResult.data) {
        const requiresShippingQuotes =
          saveFulfillmentDetailsResult.data.requiresArtsyShippingToDestination

        const isAutomaticSave =
          values.fulfillmentType === FulfillmentType.SHIP &&
          shippingContext.state.shippingFormMode === "saved_addresses"

        if (requiresShippingQuotes) {
          shippingContext.actions.setStage("shipping_quotes")
        } else if (isAutomaticSave) {
          // Don't advance if we're using saved addresses; instead wait for click
          shippingContext.actions.setStage("fulfillment_details_saved")
        } else {
          // Advance to payment
          router.push(`/orders/${orderData.internalID}/payment`)
        }
      } else {
        resetSelectedSavedAddress()
        logger.error(
          "No request for saveFulfillmentDetails - this should not happen",
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
): FulfillmentValues => {
  if (orderData.savedFulfillmentDetails) {
    return {
      fulfillmentType: orderData.savedFulfillmentDetails.fulfillmentType,
      attributes: {
        ...addressWithFallbackValues(
          orderData.savedFulfillmentDetails.attributes,
        ),
      },
      meta: {
        saveAddress: true,
        userAddressAction: null,
        addressVerifiedBy: null,
      },
    } as FulfillmentValues
  }

  const savedAddresses = meData.addressList

  return getInitialShippingValues(
    savedAddresses,
    orderData.shipsFrom,
    meData.name,
    orderData.availableShippingCountries,
  )
}
