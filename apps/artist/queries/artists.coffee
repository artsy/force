module.exports =
  """
  query artist($artist_id: String!, $contemporary: Boolean!, $artists: Boolean!) {
    artist(id: $artist_id) {
      contemporary (size: 24) @include(if: $contemporary){
        ... relatedArtist
      }
      artists (size: 24) @include(if: $artists){
        ... relatedArtist
      }
    }
  }

  #{require './artist_fragment.coffee'}
  """