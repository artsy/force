import React from "react"
import { RelayProp } from "react-relay"
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js"
import { data as sd } from "sharify"
import PaymentForm from "./PaymentForm"

export interface PaymentFormWrapperProps {
  relay?: RelayProp
  me: any
}

export class PaymentFormWrapper extends React.Component<PaymentFormWrapperProps> {
  render() {
    const stripePromise = loadStripe(sd.STRIPE_PUBLISHABLE_KEY);
    return (
      <Elements stripe={stripePromise}>
        <PaymentForm relay={this.props.relay} me={this.props.me} />
      </Elements>
    )
  }
}
