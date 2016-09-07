module.exports = """
  query($type: HomePageArtistModuleTypes){
    home_page {
      artist_module(key: $type){
        key
        results {
          ... artistCell
        }
      }
    }
  }
  #{require '../../../../components/artist_cell/query.coffee'}
"""
