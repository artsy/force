export default function SaleQuery(id) {
  return `{
    sale(id: "${id}") {
      id
      name
      start_at
      end_at
      live_start_at
      is_live_open
      status
      start_at
      description
      cover_image {
        cropped(width: 1800 height: 600 version: "wide") {
          url
        }
      }
    }
  }`
}
