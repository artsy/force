export default `
  fragment current_auctions on Sale {
    name
    href
    status
    start_at
    end_at
    live_start_at
    cover_image {
      cropped(width: 260, height: 110) {
        url
      }
    }
  }
`
