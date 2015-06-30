_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Artists = require '../../collections/artists.coffee'

@worksForYou = (req, res) ->
  return res.redirect("/log_in?redirect_uri=#{req.url}") unless req.user

  url = "#{API_URL}/api/v1/me/follow/artists"
  followingArtists = new Artists
  followingArtists.fetchUntilEnd
    url: url
    data: access_token: req.user.get('accessToken')
    success: =>
      res.render 'index', artists: followingArtists
