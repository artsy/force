export function ArtistQuery (artistId) {
  return `{
    artist(id: "${artistId}") {
      id
      name
    }
  }`
}

export function RecentlySoldQuery (id) {
  return `
    {
      ordered_set(id: "${id}") {
        id
        name
        artworks: items {
          ... on ArtworkItem {
            id
            title
            date
            artists(shallow: true) {
              name
            }
            partner(shallow: true) {
              name
            }
            image {
              placeholder
              thumb: resized(height: 170, version: ["large", "larger"]) {
                url
                width
              }
            }
          }
        }
      }
    }
  `
}

export function SalesQuery () {
  return `{
    sales(live: true, published: true, is_auction: true, size: 3) {
      _id
      auction_state
      end_at
      id
      is_auction
      is_closed
      is_live_open
      is_open
      live_start_at
      name
      start_at
    }
  }`
}
