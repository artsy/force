import { ExpressCheckoutQueryRenderer } from "Apps/Order/Components/ExpressCheckout"
import type { Order2ExpressCheckoutStep_order$key } from "__generated__/Order2ExpressCheckoutStep_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2ExpressCheckoutSectionProps {
  order: Order2ExpressCheckoutStep_order$key
}

// TODO: Placeholder for the express checkout component loosely based on legacy
// express checkout
export const Order2ExpressCheckoutStep: React.FC<
  Order2ExpressCheckoutSectionProps
> = ({ order }) => {
  const data = useFragment(FRAGMENT, order)

  if (!data) {
    return null
  }

  const isOffer = data.mode === "OFFER"
  const isFixedShipping = data.lineItems[0]?.artwork?.isFixedShippingFeeOnly

  const isExpressCheckoutEligible = !isOffer && isFixedShipping

  if (!isExpressCheckoutEligible) {
    return null
  }

  return <ExpressCheckoutQueryRenderer orderID={data.internalID} />
}

const FRAGMENT = graphql`
  fragment Order2ExpressCheckoutStep_order on Order {
    mode
    internalID
    lineItems {
      artwork {
        isFixedShippingFeeOnly
      }
    }
  }
`
