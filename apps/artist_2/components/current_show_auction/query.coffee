module.exports = """
  fragment current on Artist {
    auction: sales(size:2){
      cover_image {
        cropped(width: 150, height: 104) {
          url
        }
      }
      href
      name
      start_at
      end_at
    }
    show: partner_shows(size:2, exclude_fair_booths: true, active:true, sort:end_at_asc) {
      cover_image {
        cropped(width: 150, height: 104) {
          url
        }
      }
      href
      name
      start_at
      end_at
    }
  }
"""