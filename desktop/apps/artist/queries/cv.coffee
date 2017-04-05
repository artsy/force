module.exports =
  """
  query artist($artist_id: String!, $shows: Boolean!, $articles: Boolean!) {
    artist(id: $artist_id) {
      ... on Artist @include(if: $shows) {
        group_shows: shows(at_a_fair: false, solo_show:false, sort: start_at_desc, is_reference: true, visible_to_public: false, size: 99) {
          ... relatedShow
        }
        solo_shows: shows(at_a_fair: false, solo_show:true, sort: start_at_desc, is_reference: true, visible_to_public: false, size: 99) {
          ... relatedShow
        }
        fair_booths: shows(at_a_fair: true, sort: start_at_desc, size: 99) {
          ... relatedShow
        }
      }
      articles (limit: 99, sort: PUBLISHED_AT_DESC) @include(if: $articles) {
        href
        thumbnail_title
        published_at
      }
    }
  }

  #{require './show_fragment'}

  """
