module.exports =
  """
  fragment relatedArtist on Artist {
    id
    name
    image {
      url(version: "tall")
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