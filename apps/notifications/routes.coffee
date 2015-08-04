_ = require 'underscore'
Backbone = require 'backbone'
request = require 'superagent'
{ API_URL } = require('sharify').data
Artists = require '../../collections/artists.coffee'

@worksForYou = (req, res) ->
  return res.redirect("/log_in?redirect_uri=#{req.url}") unless req.user

  url = "#{API_URL}/api/v1/me/follow/artists"

  @followingArtists = new Artists
  @followingArtists.fetchUntilEnd
    url: url
    data: access_token: req.user.get('accessToken')
    success: =>
      fetchUnreadNotifications req.user.get('accessToken'), (unreadNotifications) ->
      #   markReadNotifications req.user.get('accessToken'), (cb) ->
        # console.log unreadNotifications
        res.locals.sd.UNREAD_NOTIFICATIONS = unreadNotifications
        res.locals.sd.FOLLOWING = @followingArtists
        res.render 'index'

fetchUnreadNotifications = (token, cb) ->
  request.get("#{API_URL}/api/v1/me/notifications")
    .query(
      type: 'ArtworkPublished'
      unread: true
      size: 100
      access_token: token
    )
    .end (err, res) ->
      cb res.body

# markReadNotifications = (token, cb) ->
#   request.put("#{API_URL}/api/v1/me/notifications")
#     .send({status: 'unread', access_token: token})
#     .end (err, res) -> cb()