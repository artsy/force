module.exports = """
  query($key: String, $id: String){
    home_page_module(key: $key, id: $id) {
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
        ... iconic_artists_context
        ... followed_artists_context
        ... related_artists_context
      }
    }
  }
  #{require '../../../components/artwork_brick/query.coffee'}
  #{require '../components/auction_context/query.coffee'}
  #{require '../components/fair_context/query.coffee'}
  #{require '../components/iconic_artists_context/query.coffee'}
  #{require '../components/followed_artists/query.coffee'}
  #{require '../components/gene_context/query.coffee'}
  #{require '../components/related_artists_context/query.coffee'}
"""
