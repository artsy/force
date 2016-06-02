module.exports = """
  fragment video on Artwork {
    is_embeddable_video
    embed(autoplay: true)
  }
"""
