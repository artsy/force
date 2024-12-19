import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { getENV } from "Utils/getENV"
import type { FC } from "react"

export const CreditCardInputProvider: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <Elements stripe={loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))}>
      {children}
    </Elements>
  )
}
