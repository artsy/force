import { Token } from "@stripe/stripe-js"

export const stripeTokenResponse: { token: Token } = {
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
