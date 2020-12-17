import { ArtworkSidebarCurrentBidInfo_Test_QueryRawResponse } from "v2/__generated__/ArtworkSidebarCurrentBidInfo_Test_Query.graphql"

export const ClosedAuctionArtwork: ArtworkSidebarCurrentBidInfo_Test_QueryRawResponse["artwork"] = {
  id: "artwork_from_closed_auction",
  myLotStanding: null,
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_closed: true,
    is_live_open: false,
    is_with_buyers_premium: false,
  },
  sale_artwork: {
    counts: {
      bidder_positions: 0,
    },
    current_bid: {
      display: "$3,000",
    },
    id: "salearwtork124",
    is_with_reserve: true,
    reserve_message: "This work has a reserve",
    reserve_status: "reserve_not_met",
  },
}

export const AuctionPreview: ArtworkSidebarCurrentBidInfo_Test_QueryRawResponse["artwork"] = {
  id: "artwork_from_auction_preview",
  myLotStanding: null,
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_closed: false,
    is_live_open: false,
    is_with_buyers_premium: false,
  },
  sale_artwork: {
    counts: {
      bidder_positions: 0,
    },
    current_bid: {
      display: "CHF 4,000",
    },
    id: "salearwtork124",
    is_with_reserve: false,
    reserve_message: null,
    reserve_status: "no_reserve",
  },
}

export const AuctionPreviewNoStartingBid: ArtworkSidebarCurrentBidInfo_Test_QueryRawResponse["artwork"] = {
  id: "artwork_from_auction_preview",
  myLotStanding: null,
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_closed: false,
    is_live_open: false,
    is_with_buyers_premium: false,
  },
  sale_artwork: {
    counts: {
      bidder_positions: 0,
    },
    current_bid: null,
    id: "salearwtork124",
    is_with_reserve: false,
    reserve_message: null,
    reserve_status: "no_reserve",
  },
}

export const OpenAuctionNoReserveNoBids: ArtworkSidebarCurrentBidInfo_Test_QueryRawResponse["artwork"] = {
  id: "open_auction_no_reserve_no_bids",
  myLotStanding: null,
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_closed: false,
    is_live_open: false,
    is_with_buyers_premium: false,
  },
  sale_artwork: {
    counts: {
      bidder_positions: 0,
    },
    current_bid: {
      display: "$500",
    },
    id: "salearwtork124",
    is_with_reserve: false,
    reserve_message: null,
    reserve_status: "no_reserve",
  },
}

export const OpenAuctionNoReserveWithBids: ArtworkSidebarCurrentBidInfo_Test_QueryRawResponse["artwork"] = {
  id: "artwork_from_open_auction",
  myLotStanding: null,
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_closed: false,
    is_live_open: false,
    is_with_buyers_premium: false,
  },
  sale_artwork: {
    counts: {
      bidder_positions: 11,
    },
    current_bid: {
      display: "$850",
    },
    id: "salearwtork124",
    is_with_reserve: false,
    reserve_message: null,
    reserve_status: "no_reserve",
  },
}

export const OpenAuctionReserveNoBids: ArtworkSidebarCurrentBidInfo_Test_QueryRawResponse["artwork"] = {
  id: "open_auction_reserve_no_bids",
  myLotStanding: null,
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_closed: false,
    is_live_open: false,
    is_with_buyers_premium: false,
  },
  sale_artwork: {
    counts: {
      bidder_positions: 0,
    },
    current_bid: {
      display: "$3,000",
    },
    id: "salearwtork124",
    is_with_reserve: true,
    reserve_message: "This work has a reserve",
    reserve_status: "reserve_not_met",
  },
}

export const OpenAuctionReserveNotMetWithBids: ArtworkSidebarCurrentBidInfo_Test_QueryRawResponse["artwork"] = {
  id: "open_auction_reserve_not_met_with_bids",
  myLotStanding: null,
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_closed: false,
    is_live_open: false,
    is_with_buyers_premium: false,
  },
  sale_artwork: {
    counts: {
      bidder_positions: 2,
    },
    current_bid: {
      display: "$10,000",
    },
    id: "salearwtork124",
    is_with_reserve: true,
    reserve_message: "Reserve not met",
    reserve_status: "reserve_not_met",
  },
}

export const OpenAuctionReserveMetWithBids: ArtworkSidebarCurrentBidInfo_Test_QueryRawResponse["artwork"] = {
  id: "open_auction_reserve_met_with_bids",
  myLotStanding: null,
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_closed: false,
    is_live_open: false,
    is_with_buyers_premium: true,
  },
  sale_artwork: {
    counts: {
      bidder_positions: 2,
    },
    current_bid: {
      display: "$500",
    },
    id: "salearwtork124",
    is_with_reserve: true,
    reserve_message: "Reserve met",
    reserve_status: "reserve_met",
  },
}

export const OpenAuctionReserveNotMetIncreasingOwnBid: ArtworkSidebarCurrentBidInfo_Test_QueryRawResponse["artwork"] = {
  id: "open_auction_reserve_not_met_increading_own_bid",
  ...OpenAuctionReserveNotMetWithBids,
  myLotStanding: [
    {
      active_bid: {
        id: "activebid",
        is_winning: true,
      },
      most_recent_bid: {
        id: "bidbid",
        max_bid: { display: "$15,000" },
      },
    },
  ],
}

export const OpenAuctionReserveMetWithMyWinningBid: ArtworkSidebarCurrentBidInfo_Test_QueryRawResponse["artwork"] = {
  id: "open_auction_reserve_met_my_winning_bid",
  ...OpenAuctionReserveMetWithBids,
  myLotStanding: [
    {
      active_bid: { id: "activebid", is_winning: true },
      most_recent_bid: { id: "bidbid", max_bid: { display: "$15,000" } },
    },
  ],
}

export const OpenAuctionReserveMetWithMyLosingBid: ArtworkSidebarCurrentBidInfo_Test_QueryRawResponse["artwork"] = {
  id: "open_auction_reserve_met_my_losing_bid",
  ...OpenAuctionReserveMetWithBids,
  myLotStanding: [
    {
      active_bid: null,
      most_recent_bid: { id: "bidbid", max_bid: { display: "$400" } },
    },
  ],
}

export const LiveAuctionInProgress: ArtworkSidebarCurrentBidInfo_Test_QueryRawResponse["artwork"] = {
  id: "artwork_from_live_auction",
  myLotStanding: null,
  sale: {
    id: "salessale",
    internalID: "asdf1234",
    is_closed: false,
    is_live_open: true,
    is_with_buyers_premium: false,
  },
  sale_artwork: {
    counts: { bidder_positions: 0 },
    current_bid: { display: "€3,200" },
    id: "salearwtork124",
    is_with_reserve: false,
    reserve_message: null,
    reserve_status: "no_reserve",
  },
}
