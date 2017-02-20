module.exports = """
  fragment carousel on Artist {
    carousel {
      images {
        title
        href
        resized(height:300){
          url
        }
      }
    }
  }
"""
