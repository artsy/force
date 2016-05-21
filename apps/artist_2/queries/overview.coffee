module.exports =
  """
  query artist($artist_id: String!, $shows: Boolean!, $artists: Boolean!, $articles: Boolean!) {
    artist(id: $artist_id) {
      shows: exhibition_highlights @include(if: $shows) {
        ... relatedShow
      }
      artists (size: 20) @include(if: $artists){
        ... relatedArtist
      }
      articles (limit: 20) @include(if: $articles){
        href
        thumbnail_title
        ... relatedArticleAuthorImage
      }
    }
  }
  #{require './article_fragment.coffee'}
  #{require './artist_fragment.coffee'}
  #{require './show_fragment.coffee'}
  """