import { ApplePay_order$key } from "__generated__/ApplePay_order.graphql"
import { ExpressCheckoutQueryRenderer } from "Apps/Order/Components/ExpressCheckout"
import { graphql, useFragment } from "react-relay"
import { useFlag } from "@unleash/proxy-client-react"
import { extractNodes } from "Utils/extractNodes"

interface ApplePayProps {
  order: ApplePay_order$key
}

export const ApplePay: React.FC<ApplePayProps> = ({ order }) => {
  const data = useFragment(orderFragment, order)
  const expressCheckoutPrototypeEnabled = useFlag(
    "emerald_stripe-express-checkout-prototype",
  )

  if (!data) {
    return null
  }

  const isOffer = data.mode === "OFFER"
  const isFixedShipping = !!extractNodes(data.lineItems)[0]?.artwork
    ?.isFixedShippingFeeOnly

  const isExpressCheckoutEligible =
    expressCheckoutPrototypeEnabled && !isOffer && isFixedShipping

  if (!isExpressCheckoutEligible) {
    return null
  }

  return <ExpressCheckoutQueryRenderer orderID={data.internalID} />
}

const orderFragment = graphql`
  fragment ApplePay_order on CommerceOrder {
    mode
    internalID
    lineItems {
      edges {
        node {
          artwork {
            isFixedShippingFeeOnly
          }
        }
      }
    }
  }
`
