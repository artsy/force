export function pastAuctions () {
  return `{
    sales(is_auction: true) {
      id
      name
      is_auction_promo
      is_closed
    }
  }`
}

export function currentAuctions () {
  return `{
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

export function upcomingAuctions () {
  return `{
    sales(is_auction: true) {
      id
      name
      is_preview
    }
  }`
}

export function promoAuctions () {
  return `{
    sales(is_auction: true) {
      id
      name
      is_auction_promo
    }
  }`
}

export function bidderPositions () {
  return `{
    me {
      bidder_positions {
        id
      }
    }
  }`
}
