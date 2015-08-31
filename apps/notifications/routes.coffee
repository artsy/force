_ = require 'underscore'
Backbone = require 'backbone'
Q = require 'bluebird-q'
sd = require('sharify').data
Artists = require '../../collections/artists.coffee'

@worksForYou = (req, res) ->
  return res.redirect("/log_in?redirect_uri=#{req.url}") unless req.user

  Q.allSettled([
    req.user.followingArtists()
    req.user.fetchAndMarkNotifications()
  ]).then ->
    res.locals.sd.UNREAD_NOTIFICATIONS = req.user.get('unreadNotifications')
    res.locals.sd.FOLLOWING = req.user.get('followArtists')
    res.locals.sd.NOTIFICATION_COUNT = null
    res.render 'index'