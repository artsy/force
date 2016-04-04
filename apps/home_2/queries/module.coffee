module.exports = """
  query($include_keys: [String]){
    home_page_modules(include_keys: $include_keys) {
      title
      key
      results{
        ... artwork
      }
    }
  }
  #{require '../../../components/commercial_filter/queries/artwork.coffee'}
"""
