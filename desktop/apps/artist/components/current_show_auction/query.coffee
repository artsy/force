module.exports = """
  fragment current on Artist {
    auction: sales(size:2, live: true, is_auction: true){
      cover_image {
        cropped(width: 60, height: 60) {
          url
        }
      }
      href
      name
      start_at
      end_at
      live_start_at
    }
    show: shows(size:2, at_a_fair: false, status:"running", sort:end_at_asc, top_tier: true) {
      ... relatedShow
      cover_image {
        cropped(width: 60, height: 60) {
          url
        }
      }
    }
  }
  #{require '../../queries/show_fragment'}
"""
