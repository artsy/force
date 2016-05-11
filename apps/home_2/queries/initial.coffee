module.exports = """
  query {
    home_page_modules{
      key
      title
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
      }
    }
  }
"""
