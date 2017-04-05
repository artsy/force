module.exports = """
  fragment show_artworks on Artwork {
    shows(size: 1, active: true) {
      name
      href
      kind
      artworks(all: true, size: 50, exclude: [$id]) {
        #{require('./index')}
      }
    }
  }
"""
