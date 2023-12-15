import { Button, ButtonProps } from "@artsy/palette"
import { useSaveSelectedShippingQuote } from "Apps/Order/Routes/Shipping2/Hooks/useSaveSelectedShippingQuote"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
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

  const shippingContext = useShippingContext()
  const { saveSelectedShippingQuote } = useSaveSelectedShippingQuote(data)

  const disableSubmit = (() => {
    if (shippingContext.state.stage === "fulfillment_details") {
      return !(
        shippingContext.state.formHelpers.isValid ||
        shippingContext.state.isPerformingOperation
      )
    } else if (shippingContext.state.stage === "shipping_quotes") {
      return !(
        shippingContext.state.selectedShippingQuoteId ||
        shippingContext.state.isPerformingOperation
      )
    }
  })()

  const onContinueButtonPressed = async () => {
    if (shippingContext.state.stage === "fulfillment_details") {
      return shippingContext.state.formHelpers.submitForm()
    }

    if (shippingContext.state.stage === "shipping_quotes") {
      await saveSelectedShippingQuote()
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
