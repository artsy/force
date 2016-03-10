_ = require 'underscore'
Backbone = require 'backbone'
RelatedShowsView = require '../../../../components/related_shows/view.coffee'
template = -> require('../../templates/sections/shows.jade') arguments...

module.exports = class ShowsView extends Backbone.View
  subViews: []

  initialize: ->
    @listenTo @model.related().shows, 'sync', @renderHeader
    @model.related().shows.fetchUntilEnd()

  postRender: ->
    relatedShowsSubView = new RelatedShowsView
      model: @model
      collection: @model.related().shows
      nUp: 3
      maxShows: 20
    @subViews.push relatedShowsSubView
    @$('#artist-page-content-section').html relatedShowsSubView.render().$el

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
