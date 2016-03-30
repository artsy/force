module.exports = """
  fragment partner on Artwork {
    is_contactable
    partner {
      type
      name
      href
      initials
      locations {
        city
      }
      profile {
        id
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
