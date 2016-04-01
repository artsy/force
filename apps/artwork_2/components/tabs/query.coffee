module.exports = """
  fragment tabs on Artwork {
    series
    publisher
    description(format: HTML)
    additional_information(format: HTML)
    signature(format: HTML)
    exhibition_history(format: HTML)
    provenance(format: HTML)
    bibliography: literature(format: HTML)
  }
"""
