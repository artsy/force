import { Button, ButtonProps } from "@artsy/palette"
import { useSaveSelectedShippingQuote } from "Apps/Order/Routes/Shipping2/Hooks/useSaveSelectedShippingQuote"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { useRouter } from "System/Hooks/useRouter"
import { SaveAndContinueButton_order$key } from "__generated__/SaveAndContinueButton_order.graphql"
import { graphql, useFragment } from "react-relay"

interface SaveAndContinueButtonProps {
  order: SaveAndContinueButton_order$key
  width?: ButtonProps["width"]
}

export const SaveAndContinueButton: React.FC<SaveAndContinueButtonProps> = ({
  order,
  width,
}) => {
  const data = useFragment(
    graphql`
      fragment SaveAndContinueButton_order on CommerceOrder {
        internalID
      }
    `,
    order
  )

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
    //  save and continue - stage", shippingContext.state.stage)
    if (shippingContext.state.stage === "fulfillment_details") {
      return shippingContext.state.fulfillmentDetailsFormikContext?.submitForm()
    }

    if (shippingContext.state.stage === "shipping_quotes") {
      await saveSelectedShippingQuote()
    }

    if (shippingContext.state.stage === "fulfillment_details_saved") {
      router.push(`/orders/${data.internalID}/payment`)
    }
  }

  return (
    <Button
      type="submit"
      onClick={onContinueButtonPressed}
      disabled={disableSubmit}
      loading={shippingContext.state.isPerformingOperation || undefined}
      variant="primaryBlack"
      width={width}
    >
      Save and Continue
    </Button>
  )
}
