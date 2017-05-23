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
    fairs(page: $page, has_listing: true, has_full_feature: true, sort: START_AT_DESC, size: 40) {
      id
      href
      name
      start_at
      end_at
      is_published
      banner_size
      organizer {
        profile_id
        profile {
          is_publically_visible
          href
        }
      }
      image {
        url(version: "wide")
      }
      location {
        city
        country
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
