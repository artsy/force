import { Elements } from "@stripe/react-stripe-js"
import {
  type StripeElementsOptions,
  type StripeElementsUpdateOptions,
  loadStripe,
} from "@stripe/stripe-js"
import { ExpressCheckoutUI } from "Apps/Order/Components/ExpressCheckout/ExpressCheckoutUI"
import { useShippingContext } from "Apps/Order/Routes/Shipping/Hooks/useShippingContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { getENV } from "Utils/getENV"
import type {} from "__generated__/ExpressCheckoutQuery.graphql"
import type { ExpressCheckout_order$key } from "__generated__/ExpressCheckout_order.graphql"
import { graphql, useFragment } from "react-relay"

const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

interface Props {
  order: ExpressCheckout_order$key
}

export const ExpressCheckout = ({ order }: Props) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)

  const { buyerTotal } = orderData

  // fall back if buyer total not available yet
  // FIXME: should use itemsTotal for fallback
  const total = buyerTotal || { minor: 123456789, currencyCode: "USD" }

  if (!(total && orderData.availableShippingCountries.length)) {
    return null
  }

  const orderOptions: StripeElementsUpdateOptions = {
    amount: total.minor,
    currency: total.currencyCode.toLowerCase(),
  }

  const options: StripeElementsOptions = {
    mode: "payment",
    appearance: {
      variables: {
        borderRadius: "50px",
      },
    },
    ...orderOptions,
  }

  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <ExpressCheckoutUI order={orderData} pickup={false} />
      </Elements>
    </>
  )
}

const ORDER_FRAGMENT = graphql`
  fragment ExpressCheckout_order on Order {
    ...ExpressCheckoutUI_order
    availableShippingCountries
    buyerTotal {
      minor
      currencyCode
    }

    # itemsTotalCents
  }
`

export const ExpressCheckoutQueryRenderer: React.FC<{ orderID: string }> = ({
  orderID,
}) => {
  const {
    orderData: { internalID },
  } = useShippingContext()
  return (
    <SystemQueryRenderer<ExpressCheckoutQuery>
      // lazyLoad
      query={graphql`
        query ExpressCheckoutQuery($orderID: String!) {
          me {
            order(id: $orderID) {
              ...ExpressCheckout_order
            }
          }
        }
      `}
      variables={{ orderID: internalID }}
      render={({ props }) => {
        console.log("****", props)
        if (props?.me?.order) {
          return <ExpressCheckout order={props?.me?.order} />
        }
        return null
      }}
    />
  )
}
