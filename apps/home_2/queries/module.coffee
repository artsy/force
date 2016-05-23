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
          start_at
          end_at
          location {
            city
          }
          profile {
            icon{
              url(version: "square140")
              versions
            }
          }
        }
        ... on HomePageModuleContextSale {
          href
          name
          description
          start_at(format: "MMM D")
          end_at(format: "MMM D")
          closes: end_at(format: "MMM D [at] ha")
        }
        ... on HomePageModuleContextGene {
          href
        }
        ... on HomePageModuleContextTrending{
          artists{
            name
            id
          }
        }
      }
    }
  }
  #{require '../../../components/commercial_filter/queries/artwork.coffee'}
"""
