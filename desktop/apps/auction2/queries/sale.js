export default function SaleQuery(id) {
  return `{
    sale(id: "${id}") {
      cover_image {
        cropped(width: 1800 height: 600 version: "wide") {
          url
        }
      }
      currency
      description
      end_at
      id
      is_live_open
      live_start_at
      name
      start_at
      status
    }
  }`
}
