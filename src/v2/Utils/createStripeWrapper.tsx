import { loadStripe } from '@stripe/stripe-js';
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js"
import * as React from "react";
import { data as sd } from "sharify"

export function createStripeWrapper<T>(Component: React.FC<T>): React.FC<T> {
  return props => {
    const stripePromise = loadStripe(sd.STRIPE_PUBLISHABLE_KEY);
    return (
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {(ctx) => (
            <Component stripe={ctx.stripe} elements={ctx.elements} {...props} />
          )}
        </ElementsConsumer>
      </Elements>
    )
  }
}
