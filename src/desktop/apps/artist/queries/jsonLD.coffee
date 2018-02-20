module.exports =
  """
  fragment jsonLD on Artist {
    image {
      url (version: "tall")
    }
    name
    href
    gender
    birthday
    deathday
    meta {
      description
    }
    nationality
    artworks(size:10, filter:[IS_FOR_SALE]) {
      title
      href
      medium
      sale_message
      image {
        url (version: "tall")
      }
      partner {
        name
        href
      }
    }
  }
  """
