import { Elements } from "@stripe/react-stripe-js"
import { type StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { ExpressCheckoutUI } from "Apps/Order/Components/ExpressCheckout/ExpressCheckoutUI"
import { getENV } from "Utils/getENV"

export const ExpressCheckout = () => {
  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 10000,
    currency: "usd",
  }

  const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <ExpressCheckoutUI />
      </Elements>
    </>
  )
}
