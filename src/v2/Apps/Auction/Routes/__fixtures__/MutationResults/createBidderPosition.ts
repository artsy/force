import { BidderPositionQueryResponse } from "v2/__generated__/BidderPositionQuery.graphql"
import { ConfirmBidCreateBidderPositionMutationResponse } from "v2/__generated__/ConfirmBidCreateBidderPositionMutation.graphql"

export const createBidderPositionSuccessful: ConfirmBidCreateBidderPositionMutationResponse = {
  createBidderPosition: {
    result: {
      messageHeader: null,
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
    },
  },
}

export const createBidderPositionSuccessfulAndBidder: ConfirmBidCreateBidderPositionMutationResponse = {
  createBidderPosition: {
    result: {
      messageHeader: null,
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
    },
  },
}

export const createBidderPositionFailed: ConfirmBidCreateBidderPositionMutationResponse = {
  createBidderPosition: {
    result: {
      messageHeader: "Lot closed",
      position: null,
      status: "SALE_CLOSED",
    },
  },
}

export const createBidderPositionWithLiveBiddingStarted: ConfirmBidCreateBidderPositionMutationResponse = {
  createBidderPosition: {
    result: {
      messageHeader: "Live bidding has started",
      position: null,
      status: "LIVE_BIDDING_STARTED",
    },
  },
}

export const createBidderPositionWithErrorBidNotPlaced: ConfirmBidCreateBidderPositionMutationResponse = {
  createBidderPosition: {
    result: {
      messageHeader: "Bid not placed",
      position: null,
      status: "ERROR",
    },
  },
}

export const createBidderPositionWithBidderNotQualified: ConfirmBidCreateBidderPositionMutationResponse = {
  createBidderPosition: {
    result: {
      messageHeader: "Bid not placed",
      position: null,
      status: "BIDDER_NOT_QUALIFIED",
    },
  },
}

export const confirmBidBidderPositionQueryWithWinning: BidderPositionQueryResponse = {
  me: {
    bidderPosition: {
      messageHeader: null,
      position: {
        internalID: "winning-bidder-position-id-from-polling",
        suggestedNextBid: null,
      },
      status: "WINNING",
    },
  },
}

export const confirmBidBidderPositionQueryWithPending: BidderPositionQueryResponse = {
  me: {
    bidderPosition: {
      messageHeader: null,
      position: {
        internalID: "pending-bidder-position-id-from-polling",
        suggestedNextBid: null,
      },
      status: "PENDING",
    },
  },
}

export const confirmBidBidderPositionQueryWithOutbid: BidderPositionQueryResponse = {
  me: {
    bidderPosition: {
      messageHeader: "Your bid wasn’t high enough",
      position: {
        internalID: "pending-bidder-position-id-from-polling",
        suggestedNextBid: null,
      },
      status: "OUTBID",
    },
  },
}
