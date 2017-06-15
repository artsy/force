export default function SaleQuery (id) {
  return `{
    sale(id: "${id}") {
      _id
      associated_sale {
        ${require('../../../components/react/auction_block/query.js').default}
      }
      auction_state
      cover_image {
        cropped(width: 1800 height: 600 version: "wide") {
          url
        }
      }
      currency
      description
      eligible_sale_artworks_count
      end_at
      id
      is_auction
      is_closed
      is_live_open
      is_open
      live_start_at
      name
      registration_ends_at
      start_at
      status
      symbol
    }
  }`
}
