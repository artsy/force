{ ARTIST } = require('sharify').data
Backbone = require 'backbone'
Artist = require '../../../models/artist.coffee'
Sticky = require '../../../components/sticky/index.coffee'

module.exports.init = ->
  artist = new Artist ARTIST

  sticky = new Sticky
  sticky.add $('.artist-page-menu')