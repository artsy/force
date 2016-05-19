_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('../../templates/sections/shows.jade') arguments...
ArtworkRailView = require '../../../../components/artwork_rail/client/view.coffee'
mediator = require '../../../../lib/mediator.coffee'
showHelpers = require '../../../../components/show_cell/helpers.coffee'

module.exports = class ShowsView extends Backbone.View
  subViews: []

  initialize: ->
    @listenTo mediator, 'artist:related:sync', @render

  postRender: ->
    @subViews.push rail = new ArtworkRailView
      $el: @$(".artist-artworks-rail")
      collection: @model.related().artworks
      title: "Works by #{@model.get('name')}"
      viewAllUrl: "#{@model.href()}/works"
      imageHeight: 180

    rail.collection.trigger 'sync'
    @fadeInSection $('#artist-related-shows-section')

  fadeInSection: ($el) ->
    $el.show()
    _.defer -> $el.addClass 'is-fade-in'

  render: ( options = { upcoming_shows, current_shows, past_shows } = {}) ->
    if options.past_shows
      options.past_fairs = []
      options.past_shows = _.select options.past_shows, (show) ->
        options.past_fairs.push show if show.fair
        return !show.fair
    @$el.html template _.extend options, { showHelpers }
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
