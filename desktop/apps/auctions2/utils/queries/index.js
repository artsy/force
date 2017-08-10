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
    sales(is_auction: true) {
      id
      name
      is_open
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
