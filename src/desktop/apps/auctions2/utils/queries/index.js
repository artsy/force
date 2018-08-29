export function pastAuctions() {
  return `
  query Auctions2PastAuctionsQuery {
    sales(is_auction: true) {
      id
      name
      is_auction_promo
      is_closed
    }
  }`
}

export function currentAuctions() {
  return `
  query Auctions2CurrentAuctionsQuery {
    sales(live: true, is_auction: true) {
      id
      name
      is_open
      is_live_open
      start_at
      registration_ends_at
      live_start_at
      cover_image {
        cropped(width: 180 height: 130 version: "medium") {
          url
        }
      }
    }
  }`
}

export function upcomingAuctions() {
  return `
  query Auctions2UpcomingAuctionsQuery {
    sales(is_auction: true) {
      id
      name
      is_preview
    }
  }`
}

export function promoAuctions() {
  return `
  query Auctions2PromoAuctionsQuery {
    sales(is_auction: true) {
      id
      name
      is_auction_promo
    }
  }`
}

export function bidderPositions() {
  return `
  query Auctions2BidderPositionsQuery {
    me {
      bidder_positions {
        id
      }
    }
  }`
}
