module.exports = """
  fragment fair_context on Fair {
    href
    name
    tagline
    start_at: startAt(format: "MMM D")
    end_at: endAt(format: "MMM D")
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
