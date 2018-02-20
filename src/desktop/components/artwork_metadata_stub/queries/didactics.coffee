module.exports = """
  fragment artwork_metadata_stub_didactics on Artwork {
    href
    title
    date
    sale_message
    cultural_maker
    artists(shallow: true) {
      href
      name
    }
    collecting_institution
    partner(shallow: true) {
      name
    }
  }
"""
