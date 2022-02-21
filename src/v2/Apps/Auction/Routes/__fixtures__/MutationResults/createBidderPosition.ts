import { BidderPositionQuery$data } from "v2/__generated__/BidderPositionQuery.graphql"
import { ConfirmBidCreateBidderPositionMutation$data } from "v2/__generated__/ConfirmBidCreateBidderPositionMutation.graphql"

export const createBidderPositionSuccessful: ConfirmBidCreateBidderPositionMutation$data = {
  createBidderPosition: {
    result: {
      position: {
        internalID: "positionid",
        saleArtwork: {
          sale: {
            registrationStatus: {
              internalID: "existing-bidder-id",
              qualifiedForBidding: true,
            },
          },
        },
      },
      status: "SUCCESS",
      messageHeader: null,
    },
  },
}

export const createBidderPositionSuccessfulAndBidder: ConfirmBidCreateBidderPositionMutation$data = {
  createBidderPosition: {
    result: {
      position: {
        internalID: "positionid",
        saleArtwork: {
          sale: {
            registrationStatus: {
              internalID: "new-bidder-id",
              qualifiedForBidding: true,
            },
          },
        },
      },
      status: "SUCCESS",
      messageHeader: null,
    },
  },
}

export const createBidderPositionFailed: ConfirmBidCreateBidderPositionMutation$data = {
  createBidderPosition: {
    result: {
      position: null,
      status: "SALE_CLOSED",
      messageHeader: "Lot closed",
    },
  },
}

export const createBidderPositionWithLiveBiddingStarted: ConfirmBidCreateBidderPositionMutation$data = {
  createBidderPosition: {
    result: {
      position: null,
      status: "LIVE_BIDDING_STARTED",
      messageHeader: "Live bidding has started",
    },
  },
}

export const createBidderPositionWithErrorBidNotPlaced: ConfirmBidCreateBidderPositionMutation$data = {
  createBidderPosition: {
    result: {
      position: null,
      status: "ERROR",
      messageHeader: "Bid not placed",
    },
  },
}

export const createBidderPositionWithBidderNotQualified: ConfirmBidCreateBidderPositionMutation$data = {
  createBidderPosition: {
    result: {
      position: null,
      status: "BIDDER_NOT_QUALIFIED",
      messageHeader: "Bid not placed",
    },
  },
}

export const confirmBidBidderPositionQueryWithWinning: BidderPositionQuery$data = {
  me: {
    bidderPosition: {
      status: "WINNING",
      messageHeader: null,
      position: {
        internalID: "winning-bidder-position-id-from-polling",
        suggestedNextBid: null,
      },
    },
  },
}

export const confirmBidBidderPositionQueryWithPending: BidderPositionQuery$data = {
  me: {
    bidderPosition: {
      status: "PENDING",
      messageHeader: null,
      position: {
        internalID: "pending-bidder-position-id-from-polling",
        suggestedNextBid: null,
      },
    },
  },
}

export const confirmBidBidderPositionQueryWithOutbid: BidderPositionQuery$data = {
  me: {
    bidderPosition: {
      status: "OUTBID",
      messageHeader: "Your bid wasn’t high enough",
      position: {
        internalID: "pending-bidder-position-id-from-polling",
        suggestedNextBid: null,
      },
    },
  },
}
