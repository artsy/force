module.exports = """
  fragment show_artworks on Artwork {
    shows(size: 1, active: true) {
      name
      href
      kind
      counts {
        eligible_artworks
      }
      artworks(size: 20, exclude: [$id]) {
        #{require('./index.coffee')}
      }
    }
  }
"""
