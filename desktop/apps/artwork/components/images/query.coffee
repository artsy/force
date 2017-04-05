module.exports = """
  fragment images on Artwork {
    title
    image_alt: to_s
    image_title
    images {
      id
      url(version: ["larger", "large"])
      placeholder: resized(width: 30, height: 30, version: "small") {
        url
      }
      is_zoomable
    }

    ... video
  }

  #{require '../video/query'}
"""
