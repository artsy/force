module.exports = """
  fragment partner on Artwork {
    _id
    is_inquireable
    partner {
      type
      name
      href
      initials
      locations {
        city
      }
      profile {
        _id
        id
        bio
        icon {
          url(version: "square140")
        }
        counts {
          follows(format: "0,0", label: "follower")
        }
      }
    }
  }
"""
