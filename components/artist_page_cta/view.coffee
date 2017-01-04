Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

module.exports = class ArtistPageCTAView extends Backbone.View

  className: 'artist-page-cta'

  initialize: ({ artist }) ->
    @artist = artist

  render: ->
    @$el.html template
      artist: @artist 
    @

