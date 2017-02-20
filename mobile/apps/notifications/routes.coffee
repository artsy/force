_ = require 'underscore'

module.exports.worksForYou = (req, res) ->
  # If the user is logged-out, redirect to /log_in unless they are coming from email.
  # If they are coming from email, redirect to artist works page.
  unless req.user
    { artist_id, from_email } = req.query
    return res.redirect("/log_in?redirect-to=#{encodeURIComponent(req.url)}") unless artist_id and from_email
    return res.redirect("/artist/#{artist_id}?filter=for_sale&sort=-published_at")
  req.user.markNotifications
    success: ->
      res.render 'index'
