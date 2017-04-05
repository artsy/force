module.exports = """
  fragment artwork_brick on Artwork {
    id
    href
    title
    image {
      placeholder
      thumb: resized(width: 350, version: ["large", "larger"]) {
        url
        height
      }
    }

    ... artwork_metadata_stub
  }

  #{require '../artwork_metadata_stub/query'}
"""
