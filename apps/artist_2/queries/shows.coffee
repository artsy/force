module.exports =
  """
  query artist($artist_id: String!) {
    artist(id: $artist_id) {
      upcoming_shows: partner_shows(status:"upcoming", sort: start_at_asc, size: 99) {
        ... relatedShow
      }
      current_shows: partner_shows(status:"running", sort: end_at_asc size: 99) {
        ... relatedShow
      }
      past_shows: partner_shows(status:"closed", at_a_fair: false, sort: end_at_desc, size: 99) {
        ... relatedShow
      }
      past_fairs: partner_shows(status:"closed", at_a_fair: true, sort: end_at_desc, size: 99) {
        ... relatedShow
      }
    }
  }

  #{require './show_fragment.coffee'}
  """