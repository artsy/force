import { FC } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { getENV } from "Utils/getENV"

export const CreditCardInputProvider: FC = ({ children }) => {
  return (
    <Elements stripe={loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))}>
      {children}
    </Elements>
  )
}
