Backbone    = require 'backbone'
ShareView   = require './share.coffee'
Transition  = require '../../../components/mixins/transition.coffee'

module.exports = class ArtworkView extends Backbone.View
  events:
    'click a[data-client]'                : 'intercept'
    'click .circle-icon-button-share'     : 'openShare'
    'click .circle-icon-button-save'      : 'saveArtwork'
    'click .artwork-artist-follow-button' : 'followArtist'

  initialize: (options) ->
    { @artwork, @artist } = options

  route: (route) ->
    # Initial server rendered route is 'show'
    # No transition unless it's happening client-side
    return if @$el.attr('data-route') is route

    @$el.attr 'data-route-pending', (@__route__ = route)

    Transition.fade @$el,
      out: => @$el.attr 'data-route', @__route__

  # Handle links with the data-client attribute via pushState
  intercept: (e) ->
    e.preventDefault()
    Backbone.history.navigate $(e.currentTarget).attr('href'), true

  openShare: (e) ->
    e.preventDefault()
    new ShareView width: '350px', artwork: @artwork

  saveArtwork: (e) ->
    e.preventDefault()

  followArtist: (e) ->
    e.preventDefault()
