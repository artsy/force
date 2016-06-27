module.exports = """
  fragment fair_context on HomePageModuleContextFair {
    href
    name
    tagline
    start_at(format: "MMM D")
    end_at(format: "MMM D")
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
