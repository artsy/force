module.exports =
  """
  query artist($artist_id: String!) {
    artist(id: $artist_id) {
      upcoming_shows: shows(status:"upcoming", sort: start_at_asc, size: 99) {
        ... relatedShow
        ... relatedShowImage
      }
      current_shows: shows(status:"running", sort: end_at_asc, size: 99) {
        ... relatedShow
        ... relatedShowImage
      }
      past_shows: shows(status:"closed", at_a_fair: false, sort: end_at_desc, size: 99) {
        ... relatedShow
        ... relatedShowImage
      }
      past_fairs: shows(status:"closed", at_a_fair: true, sort: end_at_desc, size: 99) {
        ... relatedShow
        ... relatedShowImage
      }
    }
  }

  #{require './show_fragment'}
  #{require './related_show_image'}
  """
