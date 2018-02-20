module.exports = """
  query($artist_id: String!) {
    me{
      suggested_artists(artist_id: $artist_id, exclude_followed_artists: true, exclude_artists_without_artworks: true, size: 5){
        ... artistCell
      }
    }
  }
  #{require '../../../../components/artist_cell/query.coffee'}
"""
