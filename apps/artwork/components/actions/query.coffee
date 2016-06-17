module.exports = """
  fragment actions on Artwork {
    _id
    is_shareable
    is_hangable
    dimensions {
      cm
    }
  }
"""
