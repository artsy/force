module.exports =
  """
  fragment relatedArtists on Artist {
    contemporary @include(if: $contemporary){
      ... relatedArtist
    }
    artists @include(if: $artists){
      ... relatedArtist
    }
  }

  fragment relatedArtist on Artist {
    id
    name
    nationality
    years
    birthday
    href
    image {
      url(version: "tall")
    }
    counts {
      artworks
      for_sale_artworks
    }
  }
  """