module.exports = """
  query($showHeroUnits: Boolean!) {
    home_page {
      artwork_modules(
        max_rails: 7,
        order: [
          ACTIVE_BIDS,
          RECENTLY_VIEWED_WORKS
          RECOMMENDED_WORKS,
          FOLLOWED_ARTISTS,
          RELATED_ARTISTS,
          FOLLOWED_GALLERIES,
          SAVED_WORKS,
          LIVE_AUCTIONS,
          CURRENT_FAIRS,
          FOLLOWED_GENES,
          GENERIC_GENES]) {
        key
        params {
          id
          related_artist_id
          followed_artist_id
        }
      }
      hero_units(platform: DESKTOP) @include(if: $showHeroUnits){
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
