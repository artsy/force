module.exports = """
  query($featured: Boolean, $size: Int, $sort: PartnerShowSorts, $fair_id: String, $partner_id: String, $near: Near, $status: EventStatus, $displayable: Boolean) {
    related_shows: shows(featured: $featured, size: $size, sort: $sort, fair_id: $fair_id, partner_id: $partner_id, near: $near, status: $status, displayable: $displayable) {
      id
      start_at
      end_at
      name
      href
      partner {
        name
        href
      }
      fair {
        id
        profile {
          is_published
        }
        published
        has_full_feature
        name
        href
        start_at
        end_at
      }
      location {
        display
        city
        state
        postal_code
        country
        address
        address_2
      }
      install_shots: images(size: 1, default: false) {
        thumb: resized(height: 270, version: "large") {
          url
          width
          height
        }
      }
      artworks(size: 5) {
        id
        image {
          thumb: resized(height: 270, version: "large") {
            url
            width
            height
          }
        }
      }
    }
  }
"""
