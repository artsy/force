module.exports = """
  query suggested_artists($artist_id: String!) {
    artist(id: $artist_id) {
      name
    }
    me {
      suggested_artists(artist_id: $artist_id, exclude_followed_artists: true, exclude_artists_without_artworks: true, size: 4) {
        id
        _id
        name
        thumb: image {
          cropped(width: 32, height: 32) {
            url
          }
        }
      }
    }
  }
"""
