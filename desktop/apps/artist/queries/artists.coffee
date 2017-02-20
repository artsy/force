module.exports =
  """
  query artist($artist_id: String!, $contemporary: Boolean!, $artists: Boolean!) {
    artist(id: $artist_id) {
      contemporary (size: 24) @include(if: $contemporary){
        ... artistCell
      }
      artists (size: 24) @include(if: $artists){
        ... artistCell
      }
    }
  }

  #{require '../../../components/artist_cell/query.coffee'}
  """
