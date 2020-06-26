module.exports = """
  query($artist_id: String!) {
    artist(id: $artist_id) {
      related {
        suggestedConnection(excludeFollowedArtists: true, excludeArtistsWithoutArtworks: true, first: 5) {
          edges {
            node {
              ... artistCell
            }
          }
        }
      }
    }
  }
  #{require '../../../../components/artist_cell/query2.coffee'}
"""
