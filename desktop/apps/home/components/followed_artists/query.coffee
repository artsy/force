module.exports = """
  fragment followed_artists_context on HomePageModuleContextFollowArtists {
    counts {
      artists
    }
    artists {
      id
      name
    }
  }
"""
