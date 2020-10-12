module.exports = """
  query FairsMobileQuery($page: Int, $size: Int) {
    fairs(page: $page, size: $size, hasListing: true, sort: START_AT_DESC) {
      href
      id: slug
      name
      is_published: isPublished
      location {
        city
        state
        country
      }
      start_at: startAt
      end_at: endAt
      image {
        url(version: "medium_rectangle")
      }
      profile {
        is_published: isPublished
        icon {
          url(version: "square140")
        }
      }
    }
  }
"""
