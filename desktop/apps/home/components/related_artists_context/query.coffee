module.exports = """
  fragment related_artists_context on HomePageModuleContextRelatedArtist {
    artist {
      href
      id
    }
    based_on {
      name
      href
    }
  }
"""
