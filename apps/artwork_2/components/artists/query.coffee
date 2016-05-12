module.exports = """
  fragment artists on Artwork {
    artists {
      name
      href
      biography: blurb(format: HTML)
    }
  }
"""
