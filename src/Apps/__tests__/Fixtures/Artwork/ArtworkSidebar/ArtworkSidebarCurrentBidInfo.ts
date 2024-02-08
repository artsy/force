import { ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse } from "__generated__/ArtworkSidebarCurrentBidInfo_Test_Query.graphql"

export const ClosedAuctionArtwork: ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse["artwork"] = {
  id: "artwork_from_closed_auction",
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_with_buyers_premium: false,
    is_closed: true,
    is_live_open: false,
  },
  sale_artwork: {
    id: "salearwtork124",
    is_with_reserve: true,
    reserve_message: "This work has a reserve",
    reserve_status: "reserve_not_met",
    endedAt: null,
    current_bid: {
      display: "$3,000",
    },
    counts: {
      bidder_positions: 0,
    },
  },
  myLotStanding: null,
  artists: [],
  attributionClass: null,
  mediumType: null,
  isEligibleToCreateAlert: false,
}

export const ClosedLotArtwork: ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse["artwork"] = {
  id: "artwork_from_closed_auction",
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_with_buyers_premium: false,
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    id: "salearwtork124",
    is_with_reserve: true,
    reserve_message: "This work has a reserve",
    reserve_status: "reserve_not_met",
    endedAt: "2022-03-09 16:16:33 UTC",
    current_bid: {
      display: "$3,000",
    },
    counts: {
      bidder_positions: 0,
    },
  },
  myLotStanding: null,
  artists: [],
  attributionClass: null,
  mediumType: null,
  isEligibleToCreateAlert: false,
}

export const AuctionPreview: ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse["artwork"] = {
  id: "artwork_from_auction_preview",
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_with_buyers_premium: false,
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    id: "salearwtork124",
    is_with_reserve: false,
    reserve_message: null,
    endedAt: null,
    reserve_status: "no_reserve",
    current_bid: {
      display: "CHF 4,000",
    },
    counts: {
      bidder_positions: 0,
    },
  },
  myLotStanding: null,
  artists: [],
  attributionClass: null,
  mediumType: null,
  isEligibleToCreateAlert: false,
}

export const AuctionPreviewNoStartingBid: ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse["artwork"] = {
  id: "artwork_from_auction_preview",
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_with_buyers_premium: false,
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    id: "salearwtork124",
    is_with_reserve: false,
    endedAt: null,
    reserve_message: null,
    reserve_status: "no_reserve",
    current_bid: null,
    counts: {
      bidder_positions: 0,
    },
  },
  myLotStanding: null,
  artists: [],
  attributionClass: null,
  mediumType: null,
  isEligibleToCreateAlert: false,
}

export const OpenAuctionNoReserveNoBids: ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse["artwork"] = {
  id: "open_auction_no_reserve_no_bids",
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_with_buyers_premium: false,
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    id: "salearwtork124",
    is_with_reserve: false,
    endedAt: null,
    reserve_message: null,
    reserve_status: "no_reserve",
    current_bid: {
      display: "$500",
    },
    counts: {
      bidder_positions: 0,
    },
  },
  myLotStanding: null,
  artists: [],
  attributionClass: null,
  mediumType: null,
  isEligibleToCreateAlert: false,
}

export const OpenAuctionNoReserveWithBids: ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse["artwork"] = {
  id: "artwork_from_open_auction",
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_with_buyers_premium: false,
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    id: "salearwtork124",
    is_with_reserve: false,
    endedAt: null,
    reserve_message: null,
    reserve_status: "no_reserve",
    current_bid: {
      display: "$850",
    },
    counts: {
      bidder_positions: 11,
    },
  },
  myLotStanding: null,
  artists: [],
  attributionClass: null,
  mediumType: null,
  isEligibleToCreateAlert: false,
}

export const OpenAuctionReserveNoBids: ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse["artwork"] = {
  id: "open_auction_reserve_no_bids",
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_with_buyers_premium: false,
    is_closed: false,
    is_live_open: false,
  },
  sale_artwork: {
    id: "salearwtork124",
    is_with_reserve: true,
    endedAt: null,
    reserve_message: "This work has a reserve",
    reserve_status: "reserve_not_met",
    current_bid: {
      display: "$3,000",
    },
    counts: {
      bidder_positions: 0,
    },
  },
  myLotStanding: null,
  artists: [],
  attributionClass: null,
  mediumType: null,
  isEligibleToCreateAlert: false,
}

export const OpenAuctionReserveNotMetWithBids: ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse["artwork"] = {
  id: "open_auction_reserve_not_met_with_bids",
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_closed: false,
    is_live_open: false,
    is_with_buyers_premium: false,
  },
  sale_artwork: {
    id: "salearwtork124",
    is_with_reserve: true,
    endedAt: null,
    reserve_message: "Reserve not met",
    reserve_status: "reserve_not_met",
    current_bid: {
      display: "$10,000",
    },
    counts: {
      bidder_positions: 2,
    },
  },
  myLotStanding: null,
  artists: [],
  attributionClass: null,
  mediumType: null,
  isEligibleToCreateAlert: false,
}

export const OpenAuctionReserveMetWithBids: ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse["artwork"] = {
  id: "open_auction_reserve_met_with_bids",
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_closed: false,
    is_live_open: false,
    is_with_buyers_premium: true,
  },
  sale_artwork: {
    id: "salearwtork124",
    is_with_reserve: true,
    endedAt: null,
    reserve_message: "Reserve met",
    reserve_status: "reserve_met",
    current_bid: {
      display: "$500",
    },
    counts: {
      bidder_positions: 2,
    },
  },
  myLotStanding: null,
  artists: [],
  attributionClass: null,
  mediumType: null,
  isEligibleToCreateAlert: false,
}

export const OpenAuctionReserveNotMetIncreasingOwnBid: ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse["artwork"] = {
  // @ts-ignore
  id: "open_auction_reserve_not_met_increading_own_bid",
  ...OpenAuctionReserveNotMetWithBids,
  myLotStanding: [
    {
      most_recent_bid: {
        id: "bidbid",
        max_bid: { display: "$15,000" },
      },
      active_bid: {
        id: "activebid",
        is_winning: true,
      },
    },
  ],
}

export const OpenAuctionReserveMetWithMyWinningBid: ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse["artwork"] = {
  // @ts-ignore
  id: "open_auction_reserve_met_my_winning_bid",
  ...OpenAuctionReserveMetWithBids,
  myLotStanding: [
    {
      most_recent_bid: { id: "bidbid", max_bid: { display: "$15,000" } },
      active_bid: { id: "activebid", is_winning: true },
    },
  ],
}

export const OpenAuctionReserveMetWithMyLosingBid: ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse["artwork"] = {
  // @ts-ignore
  id: "open_auction_reserve_met_my_losing_bid",
  ...OpenAuctionReserveMetWithBids,
  myLotStanding: [
    {
      most_recent_bid: { id: "bidbid", max_bid: { display: "$400" } },
      active_bid: null,
    },
  ],
}

export const LiveAuctionInProgress: ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse["artwork"] = {
  id: "artwork_from_live_auction",
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_with_buyers_premium: false,
    is_closed: false,
    is_live_open: true,
  },
  sale_artwork: {
    id: "salearwtork124",
    is_with_reserve: false,
    reserve_message: null,
    endedAt: null,
    reserve_status: "no_reserve",
    current_bid: { display: "€3,200" },
    counts: { bidder_positions: 0 },
  },
  myLotStanding: null,
  artists: [],
  attributionClass: null,
  mediumType: null,
  isEligibleToCreateAlert: false,
}
