import { Elements } from "@stripe/react-stripe-js"
import {
  type StripeElementsOptions,
  type StripeElementsUpdateOptions,
  loadStripe,
} from "@stripe/stripe-js"
import { ExpressCheckout } from "Apps/Order/Routes/Payment/ExpressCheckoutPrototype/ExpressCheckout"
import { getENV } from "Utils/getENV"

interface Props {
  order: {
    mode: string
    buyerTotalCents?: StripeElementsUpdateOptions["amount"] | null
    currencyCode?: StripeElementsUpdateOptions["currency"] | null
  }
}

const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

export const ExpressCheckoutProvider = ({ order }: Props) => {
  const { buyerTotalCents, currencyCode } = order

  if (!(buyerTotalCents && currencyCode)) {
    return null
  }

  const isBuyNow = order.mode === "BUY"

  const updateableOptions: StripeElementsUpdateOptions = {
    amount: buyerTotalCents,
    currency: currencyCode.toLowerCase(),
  }

  const options: StripeElementsOptions = {
    mode: "payment",
    captureMethod: isBuyNow ? "automatic_async" : "manual",
    ...updateableOptions,
  }

  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <ExpressCheckout />
      </Elements>
    </>
  )
}
