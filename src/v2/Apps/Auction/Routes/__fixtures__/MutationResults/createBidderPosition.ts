import { BidderPositionQueryResponse } from "v2/__generated__/BidderPositionQuery.graphql"
import { ConfirmBidCreateBidderPositionMutationResponse } from "v2/__generated__/ConfirmBidCreateBidderPositionMutation.graphql"

export const createBidderPositionSuccessful: ConfirmBidCreateBidderPositionMutationResponse = {
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

export const createBidderPositionSuccessfulAndBidder: ConfirmBidCreateBidderPositionMutationResponse = {
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

export const createBidderPositionFailed: ConfirmBidCreateBidderPositionMutationResponse = {
  createBidderPosition: {
    result: {
      position: null,
      status: "FAILED",
      messageHeader: "Sale Closed to Bids",
    },
  },
}

export const confirmBidBidderPositionQueryWithWinning: BidderPositionQueryResponse = {
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

export const confirmBidBidderPositionQueryWithPending: BidderPositionQueryResponse = {
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

export const confirmBidBidderPositionQueryWithOutbid: BidderPositionQueryResponse = {
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
