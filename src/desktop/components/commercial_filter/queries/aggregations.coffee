module.exports = """
  fragment aggregations on ArtworksAggregationResults {
    slice
    counts {
      id
      name
      count
    }
  }
"""
