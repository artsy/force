import { ReactStripeElements } from "react-stripe-elements"

export const stripeTokenResponse: ReactStripeElements.PatchedTokenResponse = {
  token: {
    id: "tok_abcabcabcabcabcabcabc",
    object: "token",
    client_ip: null,
    created: 1568139914,
    livemode: false,
    type: "card",
    used: false,
  },
}
