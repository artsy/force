import { useFlag } from "@unleash/proxy-client-react"
import { ExpressCheckoutQueryRenderer } from "Apps/Order/Components/ExpressCheckout"
import type { ExpressCheckoutSection_order$key } from "__generated__/ExpressCheckoutSection_order.graphql"
import { graphql, useFragment } from "react-relay"

interface ExpressCheckoutSectionProps {
  order: ExpressCheckoutSection_order$key
}

// TODO: Placeholder for the express checkout component loosely based on legacy
// express checkout
export const ExpressCheckoutSection: React.FC<ExpressCheckoutSectionProps> = ({
  order,
}) => {
  const data = useFragment(orderFragment, order)
  const expressCheckoutPrototypeEnabled = useFlag(
    "emerald_stripe-express-checkout-prototype",
  )

  if (!data) {
    return null
  }

  const isOffer = data.mode === "OFFER"
  const isFixedShipping = data.lineItems[0]?.artwork?.isFixedShippingFeeOnly

  const isExpressCheckoutEligible =
    expressCheckoutPrototypeEnabled && !isOffer && isFixedShipping

  if (!isExpressCheckoutEligible) {
    return null
  }

  return <ExpressCheckoutQueryRenderer orderID={data.internalID} />
}

const orderFragment = graphql`
  fragment ExpressCheckoutSection_order on Order {
    mode
    internalID
    lineItems {
      artwork {
        isFixedShippingFeeOnly
      }
    }
  }
`
