module.exports =
"""
  query artist($artist_id: String!, $contemporary: Boolean!, $showGroupings: Boolean!, $exhibitionHighlights: Boolean!, $fairs: Boolean!, $artists: Boolean!) {
    artist(id: $artist_id) {
      shows: exhibition_highlights @include(if: $exhibitionHighlights) {
        ... relatedShow
      }

      ... on Artist @include(if: $showGroupings) {
        upcoming_shows: partner_shows(status:"upcoming", at_a_fair: $fairs, size: 99) {
          ... relatedShow
        }
        current_shows: partner_shows(status:"running", at_a_fair: $fairs, size: 99) {
          ... relatedShow
        }
        past_shows: partner_shows(status:"closed", at_a_fair: $fairs, size: 99) {
          ... relatedShow
        }
      }

      contemporary (size: 24) @include(if: $contemporary){
        ... relatedArtist
      }

      artists (size: 24) @include(if: $artists){
        ... relatedArtist
      }
    }
  }

  #{require '../components/related_artists/fragment.coffee'}
  #{require '../components/related_shows/fragment.coffee'}
  """