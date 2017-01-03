module.exports = """
  query($key: String, $id: String, $related_artist_id: String, $followed_artist_id: String, $timezone: String) {
    home_page {
      artwork_module(key: $key, id: $id, related_artist_id: $related_artist_id, followed_artist_id: $followed_artist_id) {
        title
        key
        results {
          ... artwork_brick
          image {
            cell: resized(height: 180, version: ["large", "larger"]) {
              width
              height
              url
            }
          }
        }
        context {
          ... fair_context
          ... auction_context
          ... gene_context
          ... popular_artists_context
          ... followed_artists_context
          ... related_artists_context
          ... followed_artist_context
        }
      }
    }
  }
  #{require '../../../components/artwork_brick/query.coffee'}
  #{require '../components/auction_context/query.coffee'}
  #{require '../components/fair_context/query.coffee'}
  #{require '../components/popular_artists_context/query.coffee'}
  #{require '../components/followed_artists/query.coffee'}
  #{require '../components/gene_context/query.coffee'}
  #{require '../components/related_artists_context/query.coffee'}
  #{require '../components/followed_artist_context/query.coffee'}
"""
