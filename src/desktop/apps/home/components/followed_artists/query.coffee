module.exports = """
  fragment followed_artists_context on FollowArtists {
    counts {
      artists
    }
    artists {
      id: slug
      name
    }
  }
"""
