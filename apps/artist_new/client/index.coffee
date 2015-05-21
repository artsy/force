_ = require 'underscore'
{ ARTIST } = require('sharify').data
Backbone = require 'backbone'
Artist = require '../../../models/artist.coffee'
scrollFrame = require 'scroll-frame'
Sticky = require '../../../components/sticky/index.coffee'
CurrentUser = require '../../../models/current_user.coffee'
ArtistRouter = require './router.coffee'
analytics = require './analytics.coffee'

module.exports.init = ->
  artist = new Artist ARTIST

  user = CurrentUser.orNull()

  analytics artist

  scrollFrame 'a.artwork-item-image-link'

  sticky = new Sticky
  sticky.add $('.artist-page-menu')

  # rebuild the sticky menu when ajax events stop firing
  # defer to wait after render
  $(document).on 'ajaxStop', => _.defer => sticky.rebuild()

  router = new ArtistRouter model: artist, user: user
  Backbone.history.start pushState: true