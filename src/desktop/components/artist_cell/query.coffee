module.exports =
  """
  fragment artistCell on Artist {
    id
    name
    image {
      cropped (width: 400, height: 300) {
        url
      }
    }
    formatted_nationality_and_birthday
    years
    counts {
      artworks
      for_sale_artworks
    }
    href
  }
  """
