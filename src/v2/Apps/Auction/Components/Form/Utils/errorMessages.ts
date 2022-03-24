import { formatError } from "./formatError"

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

const SYSTEM_ERROR = {
  CREATE_TOKEN_ERROR:
    "There was an error creating your card token. Please try again.",
  CREATE_BIDDER_POSITION_ERROR:
    "There was an error creating your bid. Please try again.",
  CHECK_BID_STATUS_ERROR:
    "There was an error checking your bid status. Please try again.",
  FETCH_BIDDER_POSITION_ERROR:
    "There was an error fetching your bid position. Please try again.",
}

export const errorMessageForCard = errorMessage => {
  return `${errorMessage} ${CARD_ERROR[errorMessage] || ""}`
}

export const errorMessageForBidding = (errorMessage: BiddingStatus) => {
  return BIDDING_STATE_TO_MESSAGE[errorMessage]
}

export const errorMessageForSystem = (
  systemErrorKey: keyof typeof SYSTEM_ERROR,
  rawError
) => {
  const error = formatError(rawError)
  const message = SYSTEM_ERROR[systemErrorKey]

  return {
    error,
    message,
    rawError,
  }
}

export const stripeNotLoadedErrorMessage = "Error: Stripe.js has not loaded."
export const stripeCardElementNotFound =
  "Error: Cannot find Stripe.js CardElement."
