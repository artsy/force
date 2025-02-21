import { Elements } from "@stripe/react-stripe-js"
import { type StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { ExpressCheckout } from "Apps/Order/Routes/Payment/ExpressCheckoutPrototype/ExpressCheckout"
import { getENV } from "Utils/getENV"
import { graphql, useFragment } from "react-relay"

export const ExpressCheckoutProvider = ({ order }) => {
  const data = useFragment(
    graphql`
      fragment ExpressCheckoutProvider_order on CommerceOrder {
        internalID
        buyerTotalCents
      }
    `,
    order,
  )

  const { buyerTotalCents } = data

  if (!buyerTotalCents) {
    return null
  }

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: buyerTotalCents,
    currency: "usd",
    appearance: {
      variables: {
        borderRadius: "50px",
      },
    },
  }

  const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

  return (
    <Elements stripe={stripePromise} options={options}>
      <ExpressCheckout />
    </Elements>
  )
}
