import { ComponentProps } from "react"

import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import {
  BiddingStatus,
  errorMessageForBidding,
} from "v2/Apps/Auction/Components/Utils/helpers"

const HEADER_TEXT_MAPPING = {
  SALE_CLOSED: "Sale Closed",
  LIVE_BIDDING_STARTED: "Live Auction in Progress",

  // In case of bidder not qualified, the user would be redirected back to the
  // sale top page (same behaviour as registration form) and we do not have to
  // display error messages on the form.
  BIDDER_NOT_QUALIFIED: null,
  ERROR: null,

  // When the bid is low, the error message is inlined so the error modal does
  // not have to host it here.
  OUTBID: null,
  RESERVE_NOT_MET: null,
}

interface AuctionErrorModalProps extends ComponentProps<typeof ErrorModal> {
  status: BiddingStatus
}

export const AuctionErrorModal = (props: AuctionErrorModalProps) => {
  const { status, ...remainderProps } = props

  return (
    <ErrorModal
      headerText={HEADER_TEXT_MAPPING[status]}
      detailText={errorMessageForBidding(status)}
      {...remainderProps}
    />
  )
}
