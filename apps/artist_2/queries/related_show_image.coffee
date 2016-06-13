module.exports = """
  fragment relatedShowImage on PartnerShow {
    cover_image {
      cropped(width: 400, height: 300) {
        url
      }
    }
  }
"""