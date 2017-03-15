export default `
  fragment current_auctions on Sale {
    cover_image {
      cropped(width: 260, height: 110) {
        url
      }
    }
    end_at
    href
    id
    is_live_open
    live_start_at
    name
    start_at
    status
  }
`
