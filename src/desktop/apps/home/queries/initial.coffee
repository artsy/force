module.exports = """
  query HomePageQuery($showHeroUnits: Boolean!, $showCollectionsHubs: Boolean!) {
    home_page {
      artwork_modules(
        max_rails: -1,
        max_followed_gene_rails: -1,
        order: [
          ACTIVE_BIDS,
          RECENTLY_VIEWED_WORKS,
          SIMILAR_TO_RECENTLY_VIEWED,
          SAVED_WORKS,
          SIMILAR_TO_SAVED_WORKS,
          FOLLOWED_ARTISTS,
          FOLLOWED_GALLERIES,
          RECOMMENDED_WORKS,
          RELATED_ARTISTS,
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

    marketingHubCollections @include(if: $showCollectionsHubs){
      id
      slug
      title
      thumbnail
    }
  }
"""
