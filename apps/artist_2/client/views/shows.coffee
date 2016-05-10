_ = require 'underscore'
Backbone = require 'backbone'
RelatedShowsView = require '../../../../components/related_shows/view.coffee'
template = -> require('../../templates/sections/shows.jade') arguments...
ArtworkRailView = require '../../../../components/artwork_rail/client/view.coffee'

module.exports = class ShowsView extends Backbone.View
  subViews: []

  initialize: ->
    @listenTo @model.related().shows, 'sync', @renderHeader

  postRender: ->
    @subViews.push new RelatedShowsView
      model: @model
      collection: @model.related().shows
      nUp: 3
      maxShows: 20
      el: @$('#artist-related-shows-content')

    @subViews.push new ArtworkRailView
      $el: @$(".artist-artworks-rail")
      collection: @model.related().artworks
      title: "Works by #{@model.get('name')}"
      viewAllUrl: "#{@model.href()}/works"
      imageHeight: 180

    $el = $('#artist-related-shows-section').show()
    _.defer -> $el.addClass 'is-fade-in'

  renderHeader: ->
    statuses = @model.related().shows.invoke 'has', 'fair'
    return unless statuses.length

    things = _.compact [
      'shows' if _.any statuses, _.negate(Boolean) # Has shows
      'fair booths' if _.any statuses # Has fairs
    ]

    (@$header ?= @$('#artist-shows-header'))
      .text "#{@model.get 'name'} #{things.join ' and '} on Artsy"

  render: ->
    @$el.html template(artist: @model)
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
