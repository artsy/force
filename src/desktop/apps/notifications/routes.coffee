_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Artists = require '../../collections/artists.coffee'
qs = require 'qs'

@worksForYou = (req, res) ->
  # If the user is logged-out, redirect to /log_in unless they are coming from email.
  # If they are coming from email, redirect to artist works page.
  unless req.user
    { artist_id, from_email } = req.query
    return res.redirect("/log_in?redirect_uri=#{req.url}") unless artist_id and from_email
    params = _.extend sort: '-published_at', _.pick req.query, 'utm_content', 'utm_medium', 'utm_source', 'utm_campaign'
    queryString = qs.stringify params
    return res.redirect("/artist/#{artist_id}/works-for-sale?#{queryString}")

  Promise.allSettled([
    req.user.followingArtists()
    req.user.fetchAndMarkNotifications()
  ]).then ->
    res.locals.sd.UNREAD_NOTIFICATIONS = req.user.get('unreadNotifications')
    res.locals.sd.FOLLOWING = req.user.get('followArtists')
    res.locals.sd.NOTIFICATION_COUNT = null
    res.render 'index'
