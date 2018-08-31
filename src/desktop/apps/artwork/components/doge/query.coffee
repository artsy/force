module.exports = """
  query ArtworkDogeQuery($id: String!) {
    artwork(id: $id) {
      layers {
        name
      }
    }
  }
"""
