module.exports = '''
  query($page: Int) {
    featured_fairs: ordered_sets(key: "art-fairs:featured") {
      fairs: items {
        ... on FeaturedLinkItem {
          title
          subtitle
          image {
            url(version: "large_rectangle")
          }
        }
      }
    }
    fairs(page: $page, has_listing: true, sort: START_AT_DESC, size: 40) {
      id
      href
      name
      start_at
      end_at
      is_published
      banner_size
      has_listing
      image {
        url(version: "wide")
      }
      location {
        city
      }
      profile {
        id
        is_published
        href
        icon {
          url(version: "square140")
        }
      }
    }
  }
'''
