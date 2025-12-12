import type { ArtworkSidebarBidActionTestQuery$rawResponse } from "__generated__/ArtworkSidebarBidActionTestQuery.graphql"

export const ArtworkFromAuctionPreview: ArtworkSidebarBidActionTestQuery$rawResponse["artwork"] =
  {
    slug: "artwork_from_preview_auction",
    id: "sdfsdfsdf2",
    internalID: "sdf12345",
    image: {
      url: "https://example.com/artwork.jpg",
    },
    sale: {
      id: "sdfsdfsdf3",
      slug: "cool-sale",
      registrationStatus: null,
      is_preview: true,
      is_open: false,
      is_live_open: false,
      is_closed: false,
      is_registration_closed: false,
      requireIdentityVerification: false,
    },
    sale_artwork: {
      endedAt: null,
      id: "sdfsdfsdf",
      increments: [
        { cents: 400000, display: "CHF4,000" },
        { cents: 425000, display: "CHF4,250" },
        { cents: 450000, display: "CHF4,500" },
        { cents: 475000, display: "CHF4,750" },
      ],
    },
    myLotStanding: null,
    collectorSignals: {
      auction: {
        lotWatcherCount: 2,
        bidCount: 3,
      },
    },
  }

export const ArtworkFromTimedAuctionRegistrationOpen: ArtworkSidebarBidActionTestQuery$rawResponse["artwork"] =
  {
    slug: "artwork_from_open_non_live_auction",
    id: "sdfsdfsdf2",
    internalID: "sdf12345",
    image: {
      url: "https://example.com/artwork.jpg",
    },
    sale: {
      id: "sdfsdfsdf3",
      slug: "cool-sale",
      registrationStatus: null,
      is_preview: false,
      is_open: true,
      is_live_open: false,
      is_closed: false,
      is_registration_closed: false,
      requireIdentityVerification: false,
    },
    sale_artwork: {
      endedAt: null,
      id: "sdfsdfsdf",
      increments: [
        { cents: 90000, display: "$900" },
        { cents: 95000, display: "$950" },
        { cents: 100000, display: "$1,000" },
        { cents: 110000, display: "$1,100" },
      ],
    },
    myLotStanding: null,
    collectorSignals: {
      auction: {
        lotWatcherCount: 2,
        bidCount: 3,
      },
    },
  }

export const ArtworkFromTimedAuctionRegistrationClosed: ArtworkSidebarBidActionTestQuery$rawResponse["artwork"] =
  {
    slug: "artwork_from_registration_closed_timed_auction",
    id: "sdfsdfsdf2",
    internalID: "sdf12345",
    image: {
      url: "https://example.com/artwork.jpg",
    },
    sale: {
      id: "sdfsdfsdf3",
      slug: "cool-sale",
      registrationStatus: null,
      is_preview: false,
      is_open: true,
      is_live_open: false,
      is_closed: false,
      is_registration_closed: true,
      requireIdentityVerification: false,
    },
    sale_artwork: {
      endedAt: null,
      id: "sdfsdfsdf",
      increments: [
        { cents: 90000, display: "$900" },
        { cents: 95000, display: "$950" },
        { cents: 100000, display: "$1,000" },
        { cents: 110000, display: "$1,100" },
      ],
    },
    myLotStanding: null,
    collectorSignals: {
      auction: {
        lotWatcherCount: 2,
        bidCount: 3,
      },
    },
  }

export const SaleRequiringIDV: Partial<
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  ArtworkSidebarBidActionTestQuery$rawResponse["artwork"]["sale"]
> = {
  requireIdentityVerification: true,
}

export const NotIDVedUser: ArtworkSidebarBidActionTestQuery$rawResponse["me"] =
  {
    id: "user-id",
    isIdentityVerified: false,
    pendingIdentityVerification: undefined,
  }

export const UserPendingIDV: ArtworkSidebarBidActionTestQuery$rawResponse["me"] =
  {
    id: "user-id",
    isIdentityVerified: false,
    pendingIdentityVerification: { internalID: "idv-id", id: "idv-id" },
  }

export const IDVedUser: ArtworkSidebarBidActionTestQuery$rawResponse["me"] = {
  id: "user-id",
  isIdentityVerified: true,
  pendingIdentityVerification: undefined,
}

export const NoUser: ArtworkSidebarBidActionTestQuery$rawResponse["me"] = null

export const ArtworkFromLiveAuctionRegistrationOpen: ArtworkSidebarBidActionTestQuery$rawResponse["artwork"] =
  {
    slug: "artwork_from_open_live_auction_open_registration",
    id: "sdfsdfsdf2",
    internalID: "sdf12345",
    image: {
      url: "https://example.com/artwork.jpg",
    },
    sale: {
      id: "sdfsdfsdf3",
      slug: "cool-sale",
      registrationStatus: null,
      is_preview: false,
      is_open: true,
      is_live_open: true,
      is_closed: false,
      is_registration_closed: false,
      requireIdentityVerification: false,
    },
    sale_artwork: {
      endedAt: null,
      id: "sdfsdfsdf",
      increments: [
        { cents: 320000, display: "€3,200" },
        { cents: 350000, display: "€3,500" },
        { cents: 380000, display: "€3,800" },
        { cents: 400000, display: "€4,000" },
      ],
    },
    myLotStanding: null,
    collectorSignals: {
      auction: {
        lotWatcherCount: 2,
        bidCount: 3,
      },
    },
  }

export const ArtworkFromLiveAuctionRegistrationClosed: ArtworkSidebarBidActionTestQuery$rawResponse["artwork"] =
  {
    slug: "artwork_from_open_live_auction_closed_registration",
    id: "sdfsdfsdf2",
    internalID: "sdf12345",
    image: {
      url: "https://example.com/artwork.jpg",
    },
    sale: {
      id: "sdfsdfsdf3",
      slug: "cool-sale",
      registrationStatus: null,
      is_preview: false,
      is_open: true,
      is_live_open: true,
      is_closed: false,
      is_registration_closed: true,
      requireIdentityVerification: false,
    },
    sale_artwork: {
      endedAt: null,
      id: "sdfsdfsdf",
      increments: [
        { cents: 320000, display: "€3,200" },
        { cents: 350000, display: "€3,500" },
        { cents: 380000, display: "€3,800" },
        { cents: 400000, display: "€4,000" },
      ],
    },
    myLotStanding: null,
    collectorSignals: {
      auction: {
        lotWatcherCount: 2,
        bidCount: 3,
      },
    },
  }

export const ArtworkFromClosedAuction: ArtworkSidebarBidActionTestQuery$rawResponse["artwork"] =
  {
    slug: "artwork_from_closed_auction",
    id: "sdfsdfsdf2",
    internalID: "sdf12345",
    image: {
      url: "https://example.com/artwork.jpg",
    },
    sale: {
      id: "sdfsdfsdf3",
      slug: "cool-sale",
      registrationStatus: null,
      is_preview: false,
      is_open: false,
      is_live_open: false,
      is_closed: true,
      is_registration_closed: false,
      requireIdentityVerification: false,
    },
    sale_artwork: {
      endedAt: null,
      id: "sdfsdfsdf",
      increments: [
        { cents: 425000, display: "£4,250" },
        { cents: 450000, display: "£4,500" },
        { cents: 475000, display: "£4,750" },
        { cents: 500000, display: "£5,000" },
      ],
    },
    myLotStanding: null,
    collectorSignals: {
      auction: {
        lotWatcherCount: 2,
        bidCount: 3,
      },
    },
  }

export const NotRegisteredToBid = {
  myLotStanding: null,
  sale: {
    registrationStatus: null,
  },
}

export const BidderPendingApproval = {
  myLotStanding: null,
  sale: {
    registrationStatus: {
      id: "bidder_pending_approval",
      qualified_for_bidding: false,
    },
  },
}

export const RegisteredBidder = {
  myLotStanding: null,
  sale: {
    registrationStatus: { id: "bidder-id", qualified_for_bidding: true },
  },
}

export const RegistedBidderWithBids = {
  myLotStanding: [
    {
      most_recent_bid: {
        max_bid: {
          cents: 3000.0,
        },
      },
    },
  ],
  sale: {
    registrationStatus: { id: "bidder_approved", qualified_for_bidding: true },
  },
}
