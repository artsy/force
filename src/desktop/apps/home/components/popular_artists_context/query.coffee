module.exports = """
  fragment popular_artists_context on TrendingArtists {
    artists {
      name
      id: slug
    }
  }
"""
