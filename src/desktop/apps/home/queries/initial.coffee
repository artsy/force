module.exports = """
  query HomePageQuery($showHeroUnits: Boolean!, $showCollectionsHubs: Boolean!) {
    home_page: homePage {
      artwork_modules: artworkModules(
        maxRails: -1,
        maxFollowedGeneRails: -1,
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
          id: internalID
          related_artist_id: relatedArtistID
          followed_artist_id: followedArtistID
        }
      }
      hero_units: heroUnits(platform: DESKTOP) @include(if: $showHeroUnits){
        mode
        heading
        title
        title_image_url: titleImageURL
        retina_title_image_url: titleImageURL(retina: true)
        subtitle
        link_text: linkText
        href
        background_image_url: backgroundImageURL
        credit_line: creditLine
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
