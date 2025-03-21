import { Elements } from "@stripe/react-stripe-js"
import {
  type StripeElementsOptions,
  type StripeElementsUpdateOptions,
  loadStripe,
} from "@stripe/stripe-js"
import { ExpressCheckoutUI } from "Apps/Order/Components/ExpressCheckout/ExpressCheckoutUI"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { getENV } from "Utils/getENV"
import type { ExpressCheckoutQuery } from "__generated__/ExpressCheckoutQuery.graphql"
import type { ExpressCheckout_order$key } from "__generated__/ExpressCheckout_order.graphql"
import { graphql, useFragment } from "react-relay"

const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

interface Props {
  order: ExpressCheckout_order$key
}

export const ExpressCheckout = ({ order }: Props) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)

  const { buyerTotal, itemsTotal } = orderData

  // fall back to itemsTotal if buyer total not available yet
  // TODO: refresh this/refetch fragment when we do mutations
  const total = buyerTotal || itemsTotal

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
        <ExpressCheckoutUI order={orderData} />
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
    itemsTotal {
      minor
      currencyCode
    }
  }
`

export const ExpressCheckoutQueryRenderer: React.FC<{ orderID: string }> = ({
  orderID,
}) => {
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
      variables={{ orderID }}
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
