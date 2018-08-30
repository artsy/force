module.exports =
  artworks: """
    query RecentlyViewedArtworksQuery($ids: [String]) {
      artworks(ids: $ids) {
        _id
        id
        href
        image {
          thumb: resized(height: 150, version: "large") {
            url
          }
        }
      }
    }
  """

  me: """
    query RecentlyViewedArtworkIdsQuery {
      me {
        recentlyViewedArtworkIds
      }
    }
  """
