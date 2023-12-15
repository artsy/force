import { useHandleUserAddressUpdates } from "Apps/Order/Routes/Shipping2/Hooks/useHandleUserAddressUpdates"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { useSelectShippingQuote } from "Apps/Order/Routes/Shipping2/Mutations/useSelectShippingQuote"
import { FulfillmentType } from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { ArtaErrorDialogMessage } from "Apps/Order/Utils/getErrorDialogCopy"
import { useRouter } from "System/Router/useRouter"
import createLogger from "Utils/logger"
import { SaveAndContinueButton_order$data } from "__generated__/SaveAndContinueButton_order.graphql"

const logger = createLogger(
  "Order/Routes/Shipping/Hooks/useSaveSelectedShippingQuote.tsx"
)

export const useSaveSelectedShippingQuote = (
  order: SaveAndContinueButton_order$data
) => {
  const { router } = useRouter()
  const shippingContext = useShippingContext()
  const selectShippingQuote = useSelectShippingQuote()
  const { handleUserAddressUpdates } = useHandleUserAddressUpdates()

  const saveSelectedShippingQuote = async () => {
    if (!shippingContext.state.selectedShippingQuoteId) {
      logger.error("No shipping quote selected")
      return
    }
    if (
      shippingContext.parsedOrderData.savedFulfillmentDetails
        ?.fulfillmentType !== FulfillmentType.SHIP
    ) {
      logger.error("No shipping address saved")
      return
    }
    try {
      shippingContext.helpers.setIsPerformingOperation(true)

      const result = await selectShippingQuote.submitMutation({
        variables: {
          input: {
            id: order.internalID,
            selectedShippingQuoteId:
              shippingContext.state.selectedShippingQuoteId,
          },
        },
      })

      const orderOrError = result.commerceSelectShippingOption?.orderOrError

      if (orderOrError?.__typename === "CommerceOrderWithMutationFailure") {
        shippingContext.helpers.handleExchangeError(orderOrError.error, logger)
        return
      }

      await handleUserAddressUpdates(
        shippingContext.helpers.fulfillmentDetails.values
      )

      // Advance to payment
      router.push(`/orders/${order.internalID}/payment`)
    } catch (error) {
      logger.error(error)

      shippingContext.helpers.orderTracking.errorMessageViewed({
        error_code: null,
        title: "An error occurred",
        message:
          "There was a problem getting shipping quotes. Please contact orders@artsy.net.",
        flow: "user sets a shipping quote",
      })

      shippingContext.helpers.dialog.showErrorDialog({
        message: <ArtaErrorDialogMessage />,
      })
    } finally {
      shippingContext.helpers.setIsPerformingOperation(false)
    }
  }

  return { saveSelectedShippingQuote }
}
