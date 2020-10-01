module.exports = '''
  query FairsQuery($page: Int) {
    featured_fairs: orderedSets(key: "art-fairs:featured") {
      fairs: items {
        ... on FeaturedLink {
          title
          subtitle
          image {
            url(version: "large_rectangle")
          }
        }
      }
    }
    fairs(page: $page, hasListing: true, hasFullFeature: true, sort: START_AT_DESC, size: 40) {
      id: slug
      href
      name
      start_at: startAt
      end_at: endAt
      is_published: isPublished
      banner_size: bannerSize
      organizer {
        profile_id: profileID
        profile {
          is_publically_visible: isPubliclyVisible
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
        is_published: isPublished
        href
        icon {
          url(version: "square140")
        }
      }
    }
  }
'''
