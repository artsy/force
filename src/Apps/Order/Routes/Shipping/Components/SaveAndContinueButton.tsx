import { Button, type ButtonProps } from "@artsy/palette"
import { useSaveSelectedShippingQuote } from "Apps/Order/Routes/Shipping/Hooks/useSaveSelectedShippingQuote"
import { useShippingContext } from "Apps/Order/Routes/Shipping/Hooks/useShippingContext"
import { useRouter } from "System/Hooks/useRouter"
import type { SaveAndContinueButton_order$key } from "__generated__/SaveAndContinueButton_order.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

interface SaveAndContinueButtonProps {
  order: SaveAndContinueButton_order$key
  width?: ButtonProps["width"]
}

export const SaveAndContinueButton: React.FC<
  React.PropsWithChildren<SaveAndContinueButtonProps>
> = ({ order, width }) => {
  const data = useFragment(
    graphql`
      fragment SaveAndContinueButton_order on CommerceOrder {
        internalID
      }
    `,
    order,
  )

  const [isLoading, setIsLoading] = useState(false)

  const { router } = useRouter()

  const shippingContext = useShippingContext()

  const { saveSelectedShippingQuote } = useSaveSelectedShippingQuote(data)

  let disableSubmit = false

  if (shippingContext.state.isPerformingOperation) {
    disableSubmit = true
  } else if (shippingContext.state.stage === "fulfillment_details") {
    disableSubmit =
      shippingContext.state.fulfillmentDetailsFormikContext.isSubmitting
  } else if (shippingContext.state.stage === "shipping_quotes") {
    disableSubmit = !shippingContext.state.selectedShippingQuoteID
  }

  const onContinueButtonPressed = async () => {
    setIsLoading(true)

    try {
      if (shippingContext.state.stage === "fulfillment_details") {
        await shippingContext.state.fulfillmentDetailsFormikContext?.submitForm()
        router.push(`/orders/${data.internalID}/payment`)
        return
      } else if (shippingContext.state.stage === "shipping_quotes") {
        await saveSelectedShippingQuote()
      } else if (shippingContext.state.stage === "fulfillment_details_saved") {
        router.push(`/orders/${data.internalID}/payment`)
      }
    } catch (error) {
      console.error("Error during save and continue:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      type="submit"
      onClick={onContinueButtonPressed}
      disabled={disableSubmit}
      loading={isLoading}
      variant="primaryBlack"
      width={width}
    >
      Save and Continue
    </Button>
  )
}
