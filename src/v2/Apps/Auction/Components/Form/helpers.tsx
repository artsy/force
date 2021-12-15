import { find } from "lodash"
import type { CreateTokenCardData} from '@stripe/stripe-js';
import type { Address } from "v2/Components/AddressForm"

// TODO: Duplicate of `confirmRegistrationPath` in `src/v2/Apps/Auction/getRedirect.ts`
export const saleConfirmRegistrationPath = (saleSlug: string) => {
  return `/auction/${saleSlug}/confirm-registration`
}

// From https://github.com/artsy/metaphysics/blob/d6257e33/src/schema/v2/me/bidder_position_messages.ts#L3-L10
export type BiddingStatus =
  | "BIDDER_NOT_QUALIFIED"
  | "ERROR"
  | "LIVE_BIDDING_STARTED"
  | "OUTBID"
  | "RESERVE_NOT_MET"
  | "SALE_CLOSED"
  | string

const CARD_ERROR_MAPPING = {
  "Your card was declined.":
    "Please contact your bank or use a different card.",
  "Your card has insufficient funds.":
    "Please contact your bank or use a different card.",
  "Your card has expired.": "Please contact your bank or use a different card.",
  "Your card's security code is incorrect.": "Please try again.",
}

const BIDDING_STATE_TO_MESSAGE_MAPPING = {
  // In case of bidder not qualified, the user would be redirected back to the
  // sale top page (same behaviour as registration form) and we do not have to
  // display error messages on the form.
  BIDDER_NOT_QUALIFIED: null,
  ERROR: null,

  LIVE_BIDDING_STARTED: "Continue to the live sale to place your bid.",
  OUTBID: "Your bid wasn't high enough. Please select a higher bid.",
  RESERVE_NOT_MET: "Your bid is below the reserve price. Please select a higher bid.",
  SALE_CLOSED: "This sale had been closed. Please browse other open sales.",
}

export const errorMessageForCard = (errorMessage: BiddingStatus) => {
  return `${errorMessage} ${CARD_ERROR_MAPPING[errorMessage] || ""}`
}

export const errorMessageForBidding = (errorMessage: BiddingStatus) => {
  return BIDDING_STATE_TO_MESSAGE_MAPPING[errorMessage]
}

export const toStripeAddress = (address: Address): CreateTokenCardData => {
  return {
    name: address.name,
    address_line1: address.addressLine1,
    address_line2: address.addressLine2,
    address_country: address.country,
    address_city: address.city,
    address_state: address.region,
    address_zip: address.postalCode,
  }
}

export const getSelectedBid = ({
  initialSelectedBid,
  displayIncrements,
}: {
  initialSelectedBid: string
  displayIncrements: Array<{ value: string; text: string }>
}): string => {
  let selectedIncrement: { value: string }

  if (!initialSelectedBid) {
    selectedIncrement = displayIncrements[0]
  } else {
    const selectedNum = Number(initialSelectedBid)
    const lastGoodIncrement = find(
      displayIncrements,
      i => Number(i.value) === selectedNum
    )
    selectedIncrement = lastGoodIncrement || displayIncrements[0]
  }
  return selectedIncrement.value
}

export const determineDisplayRequirements = (
  bidder: object,
  me: { hasQualifiedCreditCards: boolean }
) => {
  const isRegistered = !!bidder

  return {
    requiresCheckbox: !isRegistered,
    requiresPaymentInformation: !(isRegistered || me.hasQualifiedCreditCards),
  }
}
