module.exports = """
  fragment related_artists_context on HomePageModuleContextRelatedArtist {
    artist {
      href
    }
    based_on {
      name
    }
  }
"""
