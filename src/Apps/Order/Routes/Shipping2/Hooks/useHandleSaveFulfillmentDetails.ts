import { useOrderTracking } from "Apps/Order/Hooks/useOrderTracking"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { useSaveFulfillmentDetails } from "Apps/Order/Routes/Shipping2/Mutations/useSaveFulfillmentDetails"
import {
  FulfillmentType,
  FulfillmentValues,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import createLogger from "Utils/logger"
import { CommerceSetShippingInput } from "__generated__/useSaveFulfillmentDetailsMutation.graphql"

const logger = createLogger(
  "Order/Routes/Shipping2/Hooks/useHandleSaveFulfillmentDetails"
)

type ExchangeOrGravityError =
  | Error
  | {
      code: string
      data: string | null | undefined
      type: string
    }

export const useHandleSaveFulfillmentDetails = () => {
  const shippingContext = useShippingContext()
  const saveFulfillmentDetails = useSaveFulfillmentDetails()
  const orderTracking = useOrderTracking()

  const handleSaveFulfillmentDetails = async (
    values: FulfillmentValues
  ): Promise<
    | {
        error: ExchangeOrGravityError
        data?: undefined
      }
    | {
        error?: undefined
        data: {
          internalID: string
          requiresArtsyShippingToDestination: boolean
        }
      }
  > => {
    try {
      let fulfillmentMutationValues: CommerceSetShippingInput
      let requiresArtsyShippingToDestination: boolean

      shippingContext.actions.setIsPerformingOperation(true)

      if (values.fulfillmentType === FulfillmentType.PICKUP) {
        requiresArtsyShippingToDestination = false

        fulfillmentMutationValues = {
          id: shippingContext.orderData.internalID,
          fulfillmentType: FulfillmentType.PICKUP,
          phoneNumber: values.attributes.phoneNumber,
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
      } else {
        requiresArtsyShippingToDestination = shippingContext.orderData.requiresArtsyShippingTo(
          values.attributes.country
        )

        const { phoneNumber, ...addressValues } = values.attributes

        fulfillmentMutationValues = {
          id: shippingContext.orderData.internalID,
          fulfillmentType: requiresArtsyShippingToDestination
            ? "SHIP_ARTA"
            : FulfillmentType.SHIP,
          phoneNumber,
          shipping: { ...addressValues, phoneNumber: "" },
        }

        if (values.meta.addressVerifiedBy) {
          fulfillmentMutationValues.addressVerifiedBy =
            values.meta.addressVerifiedBy
        }
      }

      const result = await saveFulfillmentDetails.submitMutation({
        variables: { input: fulfillmentMutationValues },
      })

      const orderOrError = result.commerceSetShipping?.orderOrError

      switch (orderOrError?.__typename) {
        case "CommerceOrderWithMutationSuccess":
          return {
            data: { ...orderOrError.order, requiresArtsyShippingToDestination },
          }
        case "CommerceOrderWithMutationFailure":
          shippingContext.actions.handleExchangeError(
            orderOrError.error,
            logger
          )
          return { error: orderOrError.error }
        default:
          logger.error("Unexpected mutation result", orderOrError)
          return {
            error: new Error(
              "Unexpected mutation result: " + orderOrError?.__typename
            ),
          }
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
      return { error }
    }
  }

  return { handleSaveFulfillmentDetails }
}
