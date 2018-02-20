module.exports = """
  query($page: Int, $size: Int) {
    fairs(page: $page, size: $size, has_listing: true, sort: START_AT_DESC) {
      href
      id
      name
      is_published
      location {
        city
        state
        country
      }
      start_at
      end_at
      image {
        url(version: "medium_rectangle")
      }
      profile {
        is_published
        icon {
          url(version: "square140")
        }
      }
    }
  }
"""
