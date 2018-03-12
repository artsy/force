module.exports = """
  fragment deep_zoom on Artwork {
    images {
      deep_zoom {
        Image {
          xmlns
          Url
          Format
          TileSize
          Overlap
          Size {
            Width
            Height
          }
        }
      }
    }
  }
"""
