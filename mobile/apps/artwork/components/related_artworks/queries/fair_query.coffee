module.exports = """
  fragment fair_artworks on Artwork {
    shows(at_a_fair: true) {
      name
      href
      type
      artworks(all: true, size: 50, exclude: [$id]) {
        #{require('./index')}
      }
    }
  }
"""
