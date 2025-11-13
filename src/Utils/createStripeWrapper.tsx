import { Elements, ElementsConsumer } from "@stripe/react-stripe-js"
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js"
import type * as React from "react"
// biome-ignore lint/style/noRestrictedImports: Core utility requires sharify
import { data as sd } from "sharify"

export function createStripeWrapper<T>(
  Component: React.FC<React.PropsWithChildren<T>>,
  stripeElementsOptions?: StripeElementsOptions
): React.FC<React.PropsWithChildren<T>> {
  return props => {
    const stripePromise = loadStripe(sd.STRIPE_PUBLISHABLE_KEY)
    return (
      <Elements stripe={stripePromise} options={stripeElementsOptions}>
        <ElementsConsumer>
          {ctx => (
            <Component stripe={ctx.stripe} elements={ctx.elements} {...props} />
          )}
        </ElementsConsumer>
      </Elements>
    )
  }
}
