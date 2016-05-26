module.exports =
  """
  query artist($artist_id: String!) {
    artist(id: $artist_id) {
      articles (limit: 99) {
        href
        thumbnail_title
        thumbnail_teaser
        ...relatedArticleAuthorImage
      }
    }
  }

  #{require './article_fragment.coffee'}
  """