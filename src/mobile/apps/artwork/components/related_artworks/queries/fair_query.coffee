module.exports = """
  fragment fair_artworks on Artwork {
    shows(at_a_fair: true) {
      name
      href
      type
      counts {
        eligible_artworks
      }
      artworks(size: 20, exclude: [$id]) {
        #{require('./index.coffee')}
      }
    }
  }
"""
