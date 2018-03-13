module.exports =
  """
  query artist($artist_id: String!, $shows: Boolean!, $artists: Boolean!, $articles: Boolean!, $loggedOut: Boolean!) {
    artist(id: $artist_id) {
      counts {
        shows: partner_shows
        artists: related_artists
        articles
      }
      shows: exhibition_highlights (size: 15) @include(if: $shows) {
        artists { id }
        ... relatedShow
        ... relatedShowImage
      }
      artists (size: 15) @include(if: $artists){
        ... artistCell
      }
      cta_artists: artists(size: 1) @include(if: $loggedOut){
        image {
          thumb: resized(width: 150, version: "square") {
            url
          }
        }
        name
      }
      articles (limit: 15, sort: PUBLISHED_AT_DESC) @include(if: $articles){
        href
        thumbnail_title
        ... relatedArticleAuthorImage
      }
    }
  }
  #{require './article_fragment.coffee'}
  #{require '../../../components/artist_cell/query.coffee'}
  #{require './show_fragment.coffee'}
  #{require './related_show_image.coffee'}
  """
