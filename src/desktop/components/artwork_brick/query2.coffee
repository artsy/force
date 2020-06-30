module.exports = """
  fragment artwork_brick on Artwork {
    id: slug
    is_saved: isSaved
    href
    title
    image {
      aspect_ratio: aspectRatio
      placeholder
      url: url(version: ["large"])
      thumb: resized(width: 350, version: ["large", "larger"]) {
        url
        height
      }
    }

    ... artwork_metadata_stub
  }

  #{require '../artwork_metadata_stub/query2.coffee'}
"""
