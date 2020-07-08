module.exports = """
  fragment related_artists_context on HomePageRelatedArtistArtworkModule {
    artist {
      href
      id: slug
    }
    based_on: basedOn {
      name
      href
    }
  }
"""
