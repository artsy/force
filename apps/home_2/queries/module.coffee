module.exports = """
  query($key: String, $id: String){
    home_page_module(key: $key, id: $id) {
      title
      key
      results{
        ... artwork
      }
      context {
        ... on HomePageModuleContextFair {
          href
          name
          tagline
          profile{
            icon{
              url(version: "square140")
              versions
            }
          }
        }
        ... on HomePageModuleContextSale {
          href
        }
        ... on HomePageModuleContextGene {
          href
        }
      }
    }
  }
  #{require '../../../components/commercial_filter/queries/artwork.coffee'}
"""
