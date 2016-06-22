module.exports =
  """
  fragment relatedArticleAuthorImage on Article {
    author {
      name
      href
    }
    thumbnail_image {
      cropped (width: 400, height: 300)
      {
        url
      }
    }
  }
  """