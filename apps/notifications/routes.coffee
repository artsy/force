_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data
Artists = require '../../collections/artists.coffee'

@worksForYou = (req, res) ->
  return res.redirect("/log_in?redirect_uri=#{req.url}") unless req.user

  req.user.followingArtists
    success: (followingArtists) =>
      req.user.fetchAndMarkNotifications
        success: (unreadNotifications) =>
          res.locals.sd.UNREAD_NOTIFICATIONS = unreadNotifications
          res.locals.sd.FOLLOWING = followingArtists
          res.render 'index'
