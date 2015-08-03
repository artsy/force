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
      markReadNotifications (cb) ->
        res.locals.sd.FOLLOWING = @followingArtists
        res.render 'index'

markReadNotifications = (cb) ->
  request.put("#{API_URL}/api/v1/me/notifications")
    .send({status: 'unread'})
    .end(cb)