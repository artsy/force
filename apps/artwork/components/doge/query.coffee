module.exports = """
  query artwork($id: String!) {
    artwork(id: $id) {
      layers {
        name
      }
    }
  }
"""
