module.exports = """
  fragment gallery on Artwork {
    partner {
      name
      href
      locations {
        city
      }
      profile {
        bio
        icon {
          url(version: "square140")
        }
        counts {
          follows
        }
      }
    }
  }
"""
