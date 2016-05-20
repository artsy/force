module.exports =
  """
  query artist($artist_id: String!) {
    artist(id: $artist_id) {
      articles (limit: 99) {
        title
        href
        thumbnail_title
        published_at
        thumbnail_teaser
        ...relatedArticleAuthorImage
      }
    }
  }

  #{require './article_fragment.coffee'}
  """