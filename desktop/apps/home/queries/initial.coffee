module.exports = """
  query {
    home_page {
      artwork_modules(max_rails: 6) {
        key
        params {
          id
          related_artist_id
          followed_artist_id
        }
      }
      hero_units(platform: DESKTOP) {
        mode
        heading
        title
        title_image_url
        retina_title_image_url: title_image_url(retina: true)
        subtitle
        link_text
        href
        background_image_url
        credit_line
      }
    }
  }
"""
