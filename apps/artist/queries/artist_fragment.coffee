module.exports =
  """
  fragment relatedArtist on Artist {
    id
    name
    image {
      cropped (width: 400, height: 300) {
        url
      }
    }
    birthday
    nationality
    years
    counts {
      artworks
      for_sale_artworks
    }
    href
  }
  """