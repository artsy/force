module.exports =
  """
  query artist($artist_id: String!) {
    artist(id: $artist_id) {
      upcoming_shows: partner_shows(status:"upcoming", size: 99) {
        ... relatedShow
      }
      current_shows: partner_shows(status:"running", size: 99) {
        ... relatedShow
      }
      past_shows: partner_shows(status:"closed", at_a_fair: false, size: 99) {
        ... relatedShow
      }
      past_fairs: partner_shows(status:"closed", at_a_fair: true, size: 99) {
        ... relatedShow
      }
    }
  }

  #{require './show_fragment.coffee'}
  """