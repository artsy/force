sd        = require('sharify').data
Backbone  = require 'backbone'

ShareView   = require './share.coffee'
Artwork     = require '../../../models/artwork.coffee'
Artist      = require '../../../models/artist.coffee'

module.exports.ArtworkView = class ArtworkView extends Backbone.View
  events:
    'click .circle-icon-button-share'     : 'openShare'
    'click .circle-icon-button-save'      : 'saveArtwork'
    'click .artwork-artist-follow-button' : 'followArtist'

  initialize: (options) ->
    @artist   = new Artist sd.ARTIST
    @artwork  = new Artwork sd.ARTWORK

  openShare: (e) ->
    e.preventDefault()
    new ShareView width: '350px', artwork: @artwork

  saveArtwork: (e) ->
    e.preventDefault()

  followArtist: (e) ->
    e.preventDefault()

module.exports.init = ->
  $ ->
    new ArtworkView el: $('body')
