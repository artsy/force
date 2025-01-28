import { Elements } from "@stripe/react-stripe-js"
import { type StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { ExpressCheckout } from "Apps/Order/Routes/Payment/ExpressCheckoutPrototype/ExpressCheckout"
import { getENV } from "Utils/getENV"

export const ExpressCheckoutProvider = ({ order }) => {
  const { buyerTotalCents } = order

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: buyerTotalCents,
    currency: "usd",
  }

  const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <ExpressCheckout />
      </Elements>
    </>
  )
}
