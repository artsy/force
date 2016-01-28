module.exports = """
  fragment tabs on Artwork {
    is_comparable_with_auction_results
    description(format: markdown)
    exhibition_history(format: markdown)
    bibliography(format: markdown)
    provenance(format: markdown)
    additional_information(format: markdown)
    series
    manufacturer
  }
"""
