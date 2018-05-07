module.exports = """
  fragment artwork_brick on Artwork {
    __id
    id
    href
    title
    image {
      aspect_ratio
      placeholder
      url: url(version: ["large"])
      thumb: resized(width: 350, version: ["large", "larger"]) {
        url
        height
      }
    }

    ... artwork_metadata_stub
  }

  #{require '../artwork_metadata_stub/query.coffee'}
"""
