module.exports = """
  fragment aggregations on ArtworksAggregationResults {
    slice
    counts {
      id
      count
    }
  }
"""
