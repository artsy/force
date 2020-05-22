import React from "react"
import { RelayProp } from "react-relay"
import { Elements, StripeProvider } from "react-stripe-elements"
import { data as sd } from "sharify"
import PaymentForm from "./PaymentForm"

declare global {
  interface Window {
    Stripe?: (key: string) => stripe.Stripe
  }
}

interface PaymentFormWrapperState {
  stripe: stripe.Stripe
}

export interface PaymentFormWrapperProps {
  relay?: RelayProp
  me: any
}

export class PaymentFormWrapper extends React.Component<
  PaymentFormWrapperProps,
  PaymentFormWrapperState
> {
  state = { stripe: null }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe(sd.STRIPE_PUBLISHABLE_KEY),
      })
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe(sd.STRIPE_PUBLISHABLE_KEY),
        })
      })
    }
  }

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <PaymentForm relay={this.props.relay} me={this.props.me} />
        </Elements>
      </StripeProvider>
    )
  }
}
