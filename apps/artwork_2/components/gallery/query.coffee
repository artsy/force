module.exports = """
  fragment gallery on Artwork {
    partner {
      name
      href
      initials
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
