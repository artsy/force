module.exports = """
  fragment fair_context on HomePageModuleContextFair {
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
"""
