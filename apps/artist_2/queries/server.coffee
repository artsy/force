module.exports = """
  query artist($artist_id: String!) {
    artist(id: $artist_id){
      _id
      id
      href
      name
      gender
      alternate_names
      nationality
      birthday
      deathday
      years
      location
      hometown
      blurb
      is_consignable
      counts {
        follows
        artworks
        partner_shows
      }
      ... current
      ... image
      ... statuses
      ... carousel
    }
  }

  fragment image on Artist {
    image {
      versions
      large: url(version:"large")
    }
  }

  fragment statuses on Artist{
    statuses {
      artworks
      shows
      artists
      contemporary
      articles
      biography
      cv
      auction_lots
    }
  }

  #{require '../components/carousel/query'}
  #{require '../components/current_show_auction/query'}
"""
