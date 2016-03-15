module.exports = """
  fragment shows on Artist {
    show: partner_shows(size:2, active:true, sort:end_at_asc) {
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