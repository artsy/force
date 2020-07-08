module.exports = """
  fragment artwork_metadata_stub_didactics on Artwork {
    href
    title
    date
    sale_message: saleMessage
    cultural_maker: culturalMaker
    artists(shallow: true) {
      href
      name
    }
    collecting_institution: collectingInstitution
    partner(shallow: true) {
      name
    }
  }
"""
