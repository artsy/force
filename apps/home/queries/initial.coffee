module.exports = """
  query {
    home_page {
      artwork_modules(max_rails: 6) {
        key
        params {
          id
          related_artist_id
          followed_artist_id
        }
      }
    }
  }
"""
