module.exports = """
  query {
    home_page_modules{
      key
      params{
        id
      }
      context{
        ... on HomePageModuleContextFair {
          href
        }
        ... on HomePageModuleContextSale {
          href
        }
        ... on HomePageModuleContextGene {
          href
        }
        ... on HomePageModuleContextRelatedArtist {
          artist {
            href
          }
          based_on {
            name
          }
        }
      }
    }
  }
"""
