module.exports = """
  query HomeArtistsToFollowQuery($type: HomePageArtistModuleTypes){
    home_page: homePage {
      artist_module: artistModule(key: $type){
        key
        results {
          ... artistCell
        }
      }
    }
  }
  #{require '../../../../components/artist_cell/query2.coffee'}
"""
