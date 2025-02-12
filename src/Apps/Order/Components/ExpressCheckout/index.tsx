import { Elements } from "@stripe/react-stripe-js"
import {
  type StripeElementsOptions,
  type StripeElementsUpdateOptions,
  loadStripe,
} from "@stripe/stripe-js"
import { ExpressCheckoutUI } from "Apps/Order/Components/ExpressCheckout/ExpressCheckoutUI"
import { getENV } from "Utils/getENV"
import type { ExpressCheckout_order$key } from "__generated__/ExpressCheckout_order.graphql"
import { graphql, useFragment } from "react-relay"

const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

interface Props {
  order: ExpressCheckout_order$key
}

export const ExpressCheckout = ({ order }: Props) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)

  const { buyerTotalCents, currencyCode } = orderData

  if (!(buyerTotalCents && currencyCode)) {
    return null
  }

  const orderOptions: StripeElementsUpdateOptions = {
    amount: buyerTotalCents,
    currency: currencyCode.toLowerCase(),
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
  fragment ExpressCheckout_order on CommerceOrder {
    ...ExpressCheckoutUI_order
    buyerTotalCents
    currencyCode
  }
`
