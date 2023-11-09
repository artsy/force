const CARD_ERROR = {
  "Your card was declined.":
    "Please contact your bank or use a different card.",
  "Your card has insufficient funds.":
    "Please contact your bank or use a different card.",
  "Your card has expired.": "Please contact your bank or use a different card.",
  "Your card's security code is incorrect.": "Please try again.",
}

export type BiddingStatus =
  | "BIDDER_NOT_QUALIFIED"
  | "ERROR"
  | "LIVE_BIDDING_STARTED"
  | "OUTBID"
  | "PENDING"
  | "RESERVE_NOT_MET"
  | "SALE_CLOSED"
  | "LOT_CLOSED"
  | "SUCCESS"
  | "WINNING"

const BIDDING_STATE_TO_MESSAGE: Record<
  Exclude<BiddingStatus, "PENDING" | "SUCCESS" | "WINNING">,
  string
> = {
  // In case of bidder not qualified, the user would be redirected back to the
  // sale top page (same behaviour as registration form) and we do not have to
  // display error messages on the form.
  BIDDER_NOT_QUALIFIED: "",
  ERROR: "",

  LIVE_BIDDING_STARTED: "Continue to the live sale to place your bid.",
  OUTBID: "Your bid wasn't high enough. Please select a higher bid.",
  RESERVE_NOT_MET:
    "Your bid is below the reserve price. Please select a higher bid.",
  SALE_CLOSED: "This sale has closed. Please browse other open sales.",
  LOT_CLOSED:
    "This lot has closed. Please browse other open lots for this sale.",
}

export const errorMessageForCard = errorMessage => {
  return `${errorMessage} ${CARD_ERROR[errorMessage] || ""}`
}

export const errorMessageForBidding = (errorMessage: BiddingStatus) => {
  return BIDDING_STATE_TO_MESSAGE[errorMessage]
}

export const stripeNotLoadedErrorMessage = "Error: Stripe.js has not loaded."
export const stripeCardElementNotFound =
  "Error: Cannot find Stripe.js Card Elements."
