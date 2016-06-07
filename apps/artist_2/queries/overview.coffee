module.exports =
  """
  query artist($artist_id: String!, $shows: Boolean!, $artists: Boolean!, $articles: Boolean!) {
    artist(id: $artist_id) {
      shows: exhibition_highlights (size: 16) @include(if: $shows) {
        artists { id }
        ... relatedShow
        ... relatedShow
      }
      artists (size: 16) @include(if: $artists){
        ... relatedArtist
      }
      articles (limit: 16, sort: PUBLISHED_AT_DESC) @include(if: $articles){
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