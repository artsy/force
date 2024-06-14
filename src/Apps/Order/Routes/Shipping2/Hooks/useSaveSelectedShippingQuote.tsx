import { useOrderTracking } from "Apps/Order/Hooks/useOrderTracking"
import { useUserAddressUpdates } from "Apps/Order/Routes/Shipping2/Hooks/useUserAddressUpdates"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { useSelectShippingQuote } from "Apps/Order/Routes/Shipping2/Mutations/useSelectShippingQuote"
import { FulfillmentType } from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { ArtaErrorDialogMessage } from "Apps/Order/Utils/getErrorDialogCopy"
import { useRouter } from "System/Hooks/useRouter"
import createLogger from "Utils/logger"
import { SaveAndContinueButton_order$data } from "__generated__/SaveAndContinueButton_order.graphql"

const logger = createLogger(
  "Order/Routes/Shipping/Hooks/useSaveSelectedShippingQuote.tsx"
)

export const useSaveSelectedShippingQuote = (
  order: SaveAndContinueButton_order$data
) => {
  const { router } = useRouter()
  const orderTracking = useOrderTracking()
  const shippingContext = useShippingContext()
  const selectShippingQuote = useSelectShippingQuote()
  const { handleNewUserAddressUpdates } = useUserAddressUpdates()

  const saveSelectedShippingQuote = async () => {
    if (!shippingContext.state.selectedShippingQuoteID) {
      logger.error("No shipping quote selected")
      return
    }
    if (
      shippingContext.orderData.savedFulfillmentDetails?.fulfillmentType !==
      FulfillmentType.SHIP
    ) {
      logger.error("No shipping address saved")
      return
    }
    try {
      shippingContext.actions.setIsPerformingOperation(true)

      if (shippingContext.state.shippingFormMode === "new_address") {
        await handleNewUserAddressUpdates(
          shippingContext.state.fulfillmentDetailsFormikContext.values
        )
      }

      const result = await selectShippingQuote.submitMutation({
        variables: {
          input: {
            id: order.internalID,
            selectedShippingQuoteId:
              shippingContext.state.selectedShippingQuoteID,
          },
        },
      })

      const orderOrError = result.commerceSelectShippingOption?.orderOrError

      if (orderOrError?.__typename === "CommerceOrderWithMutationFailure") {
        shippingContext.actions.handleExchangeError(orderOrError.error, logger)
        return
      }

      // Advance to payment
      router.push(`/orders/${order.internalID}/payment`)
    } catch (error) {
      logger.error(error)

      orderTracking.errorMessageViewed({
        error_code: null,
        title: "An error occurred",
        message:
          "There was a problem getting shipping quotes. Please contact orders@artsy.net.",
        flow: "user sets a shipping quote",
      })

      shippingContext.actions.dialog.showErrorDialog({
        message: <ArtaErrorDialogMessage />,
      })
    } finally {
      shippingContext.actions.setIsPerformingOperation(false)
    }
  }

  return { saveSelectedShippingQuote }
}
