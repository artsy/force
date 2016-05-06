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
      consignable
      display_auction_link
      counts {
        follows
        artworks
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
      auction_lots
    }
  }

  #{require './components/carousel/query'}
  #{require './components/current_show_auction/query'}
"""
